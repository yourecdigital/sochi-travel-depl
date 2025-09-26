// JWT Token Blacklist Implementation for Sochi Travel
const redis = require('redis');

class JWTBlacklist {
    constructor() {
        this.redisClient = redis.createClient({
            host: process.env.REDIS_HOST || 'redis',
            port: process.env.REDIS_PORT || 6379,
            password: process.env.REDIS_PASSWORD,
            retry_strategy: (options) => {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    console.error('Redis server refused connection');
                    return new Error('Redis server refused connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    console.error('Redis retry time exhausted');
                    return new Error('Redis retry time exhausted');
                }
                if (options.attempt > 10) {
                    console.error('Redis max retry attempts reached');
                    return undefined;
                }
                return Math.min(options.attempt * 100, 3000);
            }
        });

        this.redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.redisClient.on('connect', () => {
            console.log('Connected to Redis for JWT blacklist');
        });
    }

    // Add token to blacklist
    async blacklistToken(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.jti) {
                throw new Error('Invalid token structure');
            }

            // Calculate remaining time until expiration
            const now = Math.floor(Date.now() / 1000);
            const remainingTime = decoded.exp - now;

            if (remainingTime <= 0) {
                console.log('Token already expired, not adding to blacklist');
                return false;
            }

            // Store in Redis with expiration
            await this.redisClient.setex(
                `blacklist:${decoded.jti}`,
                remainingTime,
                JSON.stringify({
                    jti: decoded.jti,
                    userId: decoded.userId,
                    blacklistedAt: now,
                    expiresAt: decoded.exp
                })
            );

            console.log(`Token ${decoded.jti} blacklisted for ${remainingTime} seconds`);
            return true;
        } catch (error) {
            console.error('Error blacklisting token:', error);
            throw error;
        }
    }

    // Check if token is blacklisted
    async isTokenBlacklisted(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.jti) {
                return false;
            }

            const result = await this.redisClient.get(`blacklist:${decoded.jti}`);
            return result !== null;
        } catch (error) {
            console.error('Error checking token blacklist:', error);
            return false;
        }
    }

    // Get blacklisted token info
    async getBlacklistedTokenInfo(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.jti) {
                return null;
            }

            const result = await this.redisClient.get(`blacklist:${decoded.jti}`);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.error('Error getting blacklisted token info:', error);
            return null;
        }
    }

    // Remove token from blacklist (for testing purposes)
    async removeFromBlacklist(token) {
        try {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.jti) {
                return false;
            }

            const result = await this.redisClient.del(`blacklist:${decoded.jti}`);
            return result > 0;
        } catch (error) {
            console.error('Error removing token from blacklist:', error);
            return false;
        }
    }

    // Blacklist all tokens for a user (logout from all devices)
    async blacklistAllUserTokens(userId) {
        try {
            // Get all user sessions from Redis
            const userSessions = await this.redisClient.keys(`session:${userId}:*`);
            
            for (const sessionKey of userSessions) {
                const sessionData = await this.redisClient.get(sessionKey);
                if (sessionData) {
                    const session = JSON.parse(sessionData);
                    if (session.jti) {
                        await this.blacklistToken(session.jti);
                    }
                }
            }

            // Clear all user sessions
            if (userSessions.length > 0) {
                await this.redisClient.del(userSessions);
            }

            console.log(`Blacklisted all tokens for user ${userId}`);
            return true;
        } catch (error) {
            console.error('Error blacklisting all user tokens:', error);
            throw error;
        }
    }

    // Clean expired blacklist entries
    async cleanExpiredBlacklist() {
        try {
            const blacklistKeys = await this.redisClient.keys('blacklist:*');
            let cleaned = 0;

            for (const key of blacklistKeys) {
                const tokenData = await this.redisClient.get(key);
                if (tokenData) {
                    const data = JSON.parse(tokenData);
                    const now = Math.floor(Date.now() / 1000);
                    
                    if (data.expiresAt <= now) {
                        await this.redisClient.del(key);
                        cleaned++;
                    }
                }
            }

            console.log(`Cleaned ${cleaned} expired blacklist entries`);
            return cleaned;
        } catch (error) {
            console.error('Error cleaning expired blacklist:', error);
            return 0;
        }
    }

    // Get blacklist statistics
    async getBlacklistStats() {
        try {
            const blacklistKeys = await this.redisClient.keys('blacklist:*');
            const stats = {
                totalBlacklisted: blacklistKeys.length,
                tokens: []
            };

            for (const key of blacklistKeys) {
                const tokenData = await this.redisClient.get(key);
                if (tokenData) {
                    const data = JSON.parse(tokenData);
                    stats.tokens.push({
                        jti: data.jti,
                        userId: data.userId,
                        blacklistedAt: new Date(data.blacklistedAt * 1000),
                        expiresAt: new Date(data.expiresAt * 1000)
                    });
                }
            }

            return stats;
        } catch (error) {
            console.error('Error getting blacklist stats:', error);
            return { totalBlacklisted: 0, tokens: [] };
        }
    }

    // Decode JWT token without verification (for blacklist purposes)
    decodeToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
            }

            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
            return payload;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    // Close Redis connection
    async close() {
        try {
            await this.redisClient.quit();
            console.log('Redis connection closed');
        } catch (error) {
            console.error('Error closing Redis connection:', error);
        }
    }
}

// Middleware for JWT blacklist checking
const checkBlacklist = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return next();
        }

        const blacklist = new JWTBlacklist();
        const isBlacklisted = await blacklist.isTokenBlacklisted(token);

        if (isBlacklisted) {
            return res.status(401).json({
                error: 'Token has been revoked',
                code: 'TOKEN_BLACKLISTED'
            });
        }

        await blacklist.close();
        next();
    } catch (error) {
        console.error('Blacklist check error:', error);
        next(); // Continue if blacklist check fails
    }
};

// Logout endpoint with blacklisting
const logoutWithBlacklist = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({ error: 'No token provided' });
        }

        const blacklist = new JWTBlacklist();
        await blacklist.blacklistToken(token);
        await blacklist.close();

        res.json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Logout failed' });
    }
};

// Logout from all devices
const logoutAllDevices = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user is set by auth middleware

        const blacklist = new JWTBlacklist();
        await blacklist.blacklistAllUserTokens(userId);
        await blacklist.close();

        res.json({ message: 'Successfully logged out from all devices' });
    } catch (error) {
        console.error('Logout all devices error:', error);
        res.status(500).json({ error: 'Logout from all devices failed' });
    }
};

module.exports = {
    JWTBlacklist,
    checkBlacklist,
    logoutWithBlacklist,
    logoutAllDevices
};
