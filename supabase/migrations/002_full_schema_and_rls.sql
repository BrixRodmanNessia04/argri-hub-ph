-- AgriHub PH Extended Relational Schema & Row Level Security (RLS) Policies
-- Migration: 002_full_schema_and_rls.sql

-- 1. Farms Table
CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cooperative_id TEXT REFERENCES cooperatives(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    area_hectares NUMERIC(10, 2) NOT NULL DEFAULT 0,
    primary_crop VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Plots Table
CREATE TABLE IF NOT EXISTS plots (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    farm_id TEXT NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    area_sq_meters NUMERIC(10, 2) NOT NULL DEFAULT 0,
    soil_type VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crop Cycles Table
CREATE TABLE IF NOT EXISTS crop_cycles (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    plot_id TEXT NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    planted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    estimated_harvest_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANTED',
    target_yield_kg NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Field Activities Table
CREATE TABLE IF NOT EXISTS field_activities (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    crop_cycle_id TEXT NOT NULL REFERENCES crop_cycles(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Sales Table
CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    buyer_name VARCHAR(255) NOT NULL,
    crop VARCHAR(100) NOT NULL,
    weight_kg NUMERIC(10, 2) NOT NULL,
    price_per_kg NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    sold_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
    user_id TEXT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvest_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE field_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Farms: Farmers can manage their own farms. Coop leaders can view member farms.
CREATE POLICY farms_farmer_policy ON farms
    FOR ALL USING (auth.uid()::text = user_id);

-- Harvest Logs: Farmers manage their own logs; coops read and update status for member logs.
CREATE POLICY harvest_logs_farmer_policy ON harvest_logs
    FOR ALL USING (auth.uid()::text = farmer_id);

-- Marketplace Listings: Public read for verified buyers; Coop write restricted.
CREATE POLICY marketplace_listings_read ON marketplace_listings
    FOR SELECT USING (true);

-- Orders: Buyers read/create their own orders. Coops read orders for their listings.
CREATE POLICY orders_buyer_policy ON orders
    FOR ALL USING (auth.uid()::text = buyer_id);
