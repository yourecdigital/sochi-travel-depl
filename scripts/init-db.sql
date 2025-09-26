-- Sochi Travel Database Initialization Script
-- This script sets up the initial database structure

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS sochi_travel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE sochi_travel;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('ADMIN', 'AGENT', 'CUSTOMER') DEFAULT 'CUSTOMER',
    bonus_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_uuid (uuid),
    INDEX idx_role (role)
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    locale VARCHAR(10) DEFAULT 'ru',
    slug VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    description_i18n LONGTEXT,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100),
    destination VARCHAR(255),
    city VARCHAR(255),
    category VARCHAR(255) DEFAULT 'Общие туры',
    tour_type VARCHAR(100),
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_locale_slug (locale, slug),
    INDEX idx_category (category),
    INDEX idx_city (city),
    INDEX idx_available (available)
);

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    stars INT,
    category VARCHAR(255) DEFAULT 'Общие отели',
    city VARCHAR(255),
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_city (city),
    INDEX idx_available (available)
);

-- Create foreign_tours table
CREATE TABLE IF NOT EXISTS foreign_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    country VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    highlights JSON,
    tour_type VARCHAR(100),
    category VARCHAR(255) DEFAULT 'Общие зарубежные туры',
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_country (country),
    INDEX idx_category (category),
    INDEX idx_available (available)
);

-- Create cruises table
CREATE TABLE IF NOT EXISTS cruises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    departure VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    destination VARCHAR(255),
    category VARCHAR(255) DEFAULT 'Общие круизы',
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_departure (departure),
    INDEX idx_category (category),
    INDEX idx_available (available)
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) DEFAULT 'Общие услуги',
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT TRUE,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_available (available)
);

-- Create promotions table
CREATE TABLE IF NOT EXISTS promotions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent INT,
    valid_until TIMESTAMP,
    category VARCHAR(255) DEFAULT 'Общие акции',
    image_url VARCHAR(500),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (active),
    INDEX idx_valid_until (valid_until)
);

-- Create hero_backgrounds table
CREATE TABLE IF NOT EXISTS hero_backgrounds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    page_name VARCHAR(255) UNIQUE NOT NULL,
    background_image_url VARCHAR(500),
    background_type VARCHAR(50) DEFAULT 'image',
    fallback_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create bonus_history table
CREATE TABLE IF NOT EXISTS bonus_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    points INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration VARCHAR(100),
    destination VARCHAR(255),
    capacity VARCHAR(100),
    features JSON,
    country VARCHAR(255),
    highlights JSON,
    departure VARCHAR(255),
    category VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_item_type (item_type)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_item_type (item_type)
);

-- Insert sample data
INSERT INTO users (uuid, email, password_hash, name, role) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@sochi-travel.com', '$2b$10$example_hash', 'Admin User', 'ADMIN'),
('550e8400-e29b-41d4-a716-446655440001', 'agent@sochi-travel.com', '$2b$10$example_hash', 'Travel Agent', 'AGENT'),
('550e8400-e29b-41d4-a716-446655440002', 'customer@example.com', '$2b$10$example_hash', 'John Doe', 'CUSTOMER')
ON DUPLICATE KEY UPDATE email=email;

INSERT INTO tours (uuid, name, slug, description, price, duration, destination, city, category) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Экскурсия по Сочи', 'sochi-city-tour', 'Обзорная экскурсия по городу Сочи', 2500.00, '4 часа', 'Сочи', 'Сочи', 'Городские туры'),
('550e8400-e29b-41d4-a716-446655440011', 'Красная Поляна', 'krasnaya-polyana', 'Горнолыжный курорт Красная Поляна', 3500.00, '8 часов', 'Красная Поляна', 'Сочи', 'Горные туры')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO hotels (uuid, name, description, price, location, stars, category, city) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Отель Сочи', 'Комфортабельный отель в центре Сочи', 5000.00, 'Центр Сочи', 4, 'Городские отели', 'Сочи'),
('550e8400-e29b-41d4-a716-446655440021', 'Горный отель', 'Отель в горах с видом на море', 7500.00, 'Красная Поляна', 5, 'Горные отели', 'Сочи')
ON DUPLICATE KEY UPDATE name=name;

-- Create indexes for better performance
CREATE INDEX idx_tours_price ON tours(price);
CREATE INDEX idx_hotels_price ON hotels(price);
CREATE INDEX idx_foreign_tours_price ON foreign_tours(price);
CREATE INDEX idx_cruises_price ON cruises(price);
CREATE INDEX idx_services_price ON services(price);

-- Set up user permissions
GRANT ALL PRIVILEGES ON sochi_travel.* TO 'sochi_user'@'%';
FLUSH PRIVILEGES;