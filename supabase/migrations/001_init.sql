-- AgriHub PH PostgreSQL Schema
-- Migration: 001_init.sql
-- Multi-role B2B Agritech Platform (Farmers, Cooperative Leaders, Buyers)

-- gen_random_uuid() is built into supported Supabase PostgreSQL versions.

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('FARMER', 'COOP_LEADER', 'BUYER')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cooperatives Table
CREATE TABLE IF NOT EXISTS cooperatives (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    name VARCHAR(255) NOT NULL,
    leader_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Farmers Table
CREATE TABLE IF NOT EXISTS farmers (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    coop_id TEXT REFERENCES cooperatives(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Harvest Logs Table
CREATE TABLE IF NOT EXISTS harvest_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    farmer_id TEXT NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
    crop VARCHAR(100) NOT NULL,
    weight_kg NUMERIC(10, 2) NOT NULL CHECK (weight_kg >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'AGGREGATED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Marketplace Listings Table
CREATE TABLE IF NOT EXISTS marketplace_listings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    coop_id TEXT NOT NULL REFERENCES cooperatives(id) ON DELETE CASCADE,
    crop VARCHAR(100) NOT NULL,
    total_weight_kg NUMERIC(10, 2) NOT NULL CHECK (total_weight_kg >= 0),
    price_per_kg NUMERIC(10, 2) NOT NULL CHECK (price_per_kg >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    buyer_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    listing_id TEXT NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_harvest_logs_status ON harvest_logs(status);
CREATE INDEX IF NOT EXISTS idx_harvest_logs_crop ON harvest_logs(crop);
CREATE INDEX IF NOT EXISTS idx_harvest_logs_farmer_id ON harvest_logs(farmer_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_coop_id ON marketplace_listings(coop_id);
CREATE INDEX IF NOT EXISTS idx_orders_listing_id ON orders(listing_id);
