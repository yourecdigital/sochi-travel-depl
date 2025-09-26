-- Sochi Travel Database Initialization Script
-- MariaDB 11.4 compatible

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS sochi_travel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE sochi_travel;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'sochi_travel_user'@'%' IDENTIFIED BY 'your_secure_db_password_here';
GRANT ALL PRIVILEGES ON sochi_travel.* TO 'sochi_travel_user'@'%';
FLUSH PRIVILEGES;

-- Create tables (will be handled by Prisma migrations)
-- This is just a placeholder for manual setup if needed

-- Set SQL mode for better compatibility
SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO';

-- Create indexes for better performance
-- These will be created by Prisma, but here for reference

-- Users table indexes
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_users_uuid ON users(uuid);
-- CREATE INDEX idx_users_role ON users(role);

-- Tours table indexes  
-- CREATE INDEX idx_tours_locale_slug ON tours(locale, slug);
-- CREATE INDEX idx_tours_category ON tours(category);
-- CREATE INDEX idx_tours_available ON tours(available);

-- Orders table indexes
-- CREATE INDEX idx_orders_user_id ON orders(user_id);
-- CREATE INDEX idx_orders_status ON orders(status);
-- CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Performance tuning for MariaDB
SET GLOBAL innodb_buffer_pool_size = 268435456; -- 256MB
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 67108864; -- 64MB
SET GLOBAL query_cache_type = 1;
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 2;

-- Create backup user for automated backups
CREATE USER IF NOT EXISTS 'backup_user'@'localhost' IDENTIFIED BY 'backup_password_here';
GRANT SELECT, LOCK TABLES ON sochi_travel.* TO 'backup_user'@'localhost';
FLUSH PRIVILEGES;

