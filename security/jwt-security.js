// JWT Security Configuration for Sochi Travel API
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTSecurity {
    constructor() {
        // Security: Strong JWT configuration
        this.accessTokenExpiry = '15m';  // Short-lived access tokens
        this.refreshTokenExpiry = '7d';  // Longer refresh tokens
        this.algorithm = 'HS256';        // Secure algorithm
        
        // Security: Validate secrets
        this.validateSecrets();
    }
    
    validateSecrets() {
        const jwtSecret = process.env.JWT_SECRET;
        const refreshSecret = process.env.REFRESH_SECRET;
        
        if (!jwtSecret || jwtSecret.length < 64) {
            throw new Error('JWT_SECRET must be at least 64 characters long');
        }
        
        if (!refreshSecret || refreshSecret.length < 64) {
            throw new Error('REFRESH_SECRET must be at least 64 characters long');
        }
        
        // Security: Check for weak secrets
        const weakPatterns = [
            'password', 'secret', '123456', 'admin', 'test',
            'qwerty', 'abc123', 'password123'
        ];
        
        weakPatterns.forEach(pattern => {
            if (jwtSecret.toLowerCase().includes(pattern) || 
                refreshSecret.toLowerCase().includes(pattern)) {
                throw new Error('JWT secrets contain weak patterns');
            }
        });
    }
    
    generateAccessToken(payload) {
        // Security: Add security claims
        const securePayload = {
            ...payload,
            iat: Math.floor(Date.now() / 1000),
            jti: crypto.randomUUID(), // Unique token ID
            aud: 'sochi-travel-api',   // Audience
            iss: 'sochi-travel-auth'   // Issuer
        };
        
        return jwt.sign(securePayload, process.env.JWT_SECRET, {
            expiresIn: this.accessTokenExpiry,
            algorithm: this.algorithm,
            issuer: 'sochi-travel-auth',
            audience: 'sochi-travel-api'
        });
    }
    
    generateRefreshToken(payload) {
        const securePayload = {
            userId: payload.userId,
            type: 'refresh',
            iat: Math.floor(Date.now() / 1000),
            jti: crypto.randomUUID()
        };
        
        return jwt.sign(securePayload, process.env.REFRESH_SECRET, {
            expiresIn: this.refreshTokenExpiry,
            algorithm: this.algorithm,
            issuer: 'sochi-travel-auth',
            audience: 'sochi-travel-refresh'
        });
    }
    
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: [this.algorithm],
                issuer: 'sochi-travel-auth',
                audience: 'sochi-travel-api'
            });
        } catch (error) {
            throw new Error(`Invalid access token: ${error.message}`);
        }
    }
    
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET, {
                algorithms: [this.algorithm],
                issuer: 'sochi-travel-auth',
                audience: 'sochi-travel-refresh'
            });
        } catch (error) {
            throw new Error(`Invalid refresh token: ${error.message}`);
        }
    }
    
    // Security: Token blacklist for logout
    blacklistToken(token) {
        // Implement token blacklist in Redis
        const decoded = jwt.decode(token);
        if (decoded && decoded.jti) {
            // Store in Redis with expiration
            const redisClient = require('./redis-client');
            redisClient.setex(`blacklist:${decoded.jti}`, 
                             decoded.exp - Math.floor(Date.now() / 1000), 
                             'blacklisted');
        }
    }
    
    // Security: Check if token is blacklisted
    async isTokenBlacklisted(token) {
        const decoded = jwt.decode(token);
        if (decoded && decoded.jti) {
            const redisClient = require('./redis-client');
            const result = await redisClient.get(`blacklist:${decoded.jti}`);
            return result === 'blacklisted';
        }
        return false;
    }
    
    // Security: Rate limiting for token generation
    async checkRateLimit(userId, action = 'login') {
        const redisClient = require('./redis-client');
        const key = `rate_limit:${action}:${userId}`;
        
        const current = await redisClient.incr(key);
        if (current === 1) {
            await redisClient.expire(key, 900); // 15 minutes
        }
        
        const limit = action === 'login' ? 5 : 10; // 5 login attempts, 10 refresh attempts
        
        if (current > limit) {
            throw new Error(`Rate limit exceeded for ${action}`);
        }
        
        return { current, limit, remaining: limit - current };
    }
    
    // Security: Generate secure random secrets
    static generateSecureSecret(length = 64) {
        return crypto.randomBytes(length).toString('hex');
    }
    
    // Security: Validate token structure
    validateTokenStructure(token) {
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid token format');
        }
        
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT structure');
        }
        
        // Check for suspicious patterns
        if (token.includes('<script>') || token.includes('javascript:')) {
            throw new Error('Suspicious token content');
        }
        
        return true;
    }
}

// Security: Middleware for JWT validation
const authenticateToken = async (req, res, next) => {
    const jwtSecurity = new JWTSecurity();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    try {
        // Security: Validate token structure
        jwtSecurity.validateTokenStructure(token);
        
        // Security: Check if token is blacklisted
        if (await jwtSecurity.isTokenBlacklisted(token)) {
            return res.status(401).json({ error: 'Token has been revoked' });
        }
        
        // Security: Verify token
        const decoded = jwtSecurity.verifyAccessToken(token);
        req.user = decoded;
        
        // Security: Log token usage
        console.log(`Token used by user ${decoded.userId} from IP ${req.ip}`);
        
        next();
    } catch (error) {
        console.error('JWT validation error:', error.message);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = {
    JWTSecurity,
    authenticateToken
};
