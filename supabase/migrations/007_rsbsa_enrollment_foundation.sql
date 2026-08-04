-- AgriHub PH RSBSA Enrollment Form & Profile Foundation Migration
-- Migration: 007_rsbsa_enrollment_foundation.sql

-- 1. RSBSA Main Profiles Table
CREATE TABLE IF NOT EXISTS rsbsa_profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    transaction_code VARCHAR(100),
    phil_id_pcn VARCHAR(100),
    transaction_reference_number VARCHAR(100),
    rsbsa_number VARCHAR(50),

    surname VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    has_no_middle_name BOOLEAN DEFAULT false,
    extension_name VARCHAR(20),
    has_no_extension_name BOOLEAN DEFAULT true,

    sex VARCHAR(20) CHECK (sex IN ('male', 'female', 'other')),
    date_of_birth DATE,
    place_of_birth_municipality VARCHAR(100),
    place_of_birth_province_state_country VARCHAR(100),

    mothers_maiden_first_name VARCHAR(100),
    mothers_maiden_middle_name VARCHAR(100),
    mothers_maiden_surname VARCHAR(100),
    mothers_maiden_extension_name VARCHAR(20),

    civil_status VARCHAR(50) CHECK (civil_status IN ('single', 'married', 'widow_widower', 'legally_separated')),
    spouse_first_name VARCHAR(100),
    spouse_middle_name VARCHAR(100),
    spouse_surname VARCHAR(100),
    spouse_extension_name VARCHAR(20),

    highest_formal_education VARCHAR(100),
    religion VARCHAR(100),

    is_icc_ip BOOLEAN DEFAULT false,
    icc_ip_name VARCHAR(150),
    is_pwd BOOLEAN DEFAULT false,
    is_4ps_beneficiary BOOLEAN DEFAULT false,

    livelihood_farmer BOOLEAN DEFAULT false,
    livelihood_farm_worker BOOLEAN DEFAULT false,
    livelihood_fisher BOOLEAN DEFAULT false,
    livelihood_agri_youth BOOLEAN DEFAULT false,

    registration_status VARCHAR(50) DEFAULT 'draft' CHECK (registration_status IN ('draft', 'submitted', 'under_review', 'verified', 'rejected')),
    profile_completion_percentage NUMERIC(5, 2) DEFAULT 0,
    version INT DEFAULT 1,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profile Addresses Table
CREATE TABLE IF NOT EXISTS profile_addresses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    address_type VARCHAR(50) NOT NULL CHECK (address_type IN ('permanent', 'ncr_provincial')),
    house_lot_bldg_purok VARCHAR(255),
    street_sitio_subdivision VARCHAR(255),
    barangay VARCHAR(150) NOT NULL,
    city_municipality VARCHAR(150) NOT NULL,
    province VARCHAR(150) NOT NULL,
    region VARCHAR(150) NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Profile Mobile Contacts Table
CREATE TABLE IF NOT EXISTS profile_mobile_contacts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    mobile_number VARCHAR(50) NOT NULL,
    is_owned BOOLEAN DEFAULT true,
    owner_full_name VARCHAR(255),
    owner_relationship VARCHAR(100),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Profile Memberships Table
CREATE TABLE IF NOT EXISTS profile_memberships (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    organization_name VARCHAR(255) NOT NULL,
    organization_type VARCHAR(100) DEFAULT 'fca_ia_coop',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Profile Identity Documents Table
CREATE TABLE IF NOT EXISTS profile_identity_documents (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    id_type VARCHAR(100) NOT NULL,
    id_number VARCHAR(100) NOT NULL,
    document_image_url TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Profile Farm Parcels Table (Part 3 of Form)
CREATE TABLE IF NOT EXISTS profile_farm_parcels (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    parcel_number INT DEFAULT 1,
    barangay VARCHAR(150) NOT NULL,
    city_municipality VARCHAR(150) NOT NULL,
    province VARCHAR(150) NOT NULL,
    
    total_area_ha NUMERIC(10, 4) NOT NULL DEFAULT 0,
    within_ancestral_domain BOOLEAN DEFAULT false,
    is_arb_beneficiary BOOLEAN DEFAULT false,

    ownership_proof_type VARCHAR(100),
    tenure_type VARCHAR(100) NOT NULL, -- Registered Owner, Lessee, Tenant, Others
    landowner_name VARCHAR(255),
    landowner_rsbsa_number VARCHAR(50),
    rotational_tiller_name VARCHAR(255),
    rotational_tiller_rsbsa_number VARCHAR(50),

    cropping_schedule VARCHAR(100),
    main_commodity VARCHAR(150) NOT NULL,
    size_ha NUMERIC(10, 4),
    head_or_tree_count INT,
    farm_type VARCHAR(50) CHECK (farm_type IN ('irrigated', 'rainfed_upland', 'rainfed_lowland', 'urban_peri_urban', 'not_applicable')),
    is_organic BOOLEAN DEFAULT false,
    intercropping_details TEXT,
    remarks TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Profile Fisheries Table
CREATE TABLE IF NOT EXISTS profile_fisheries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    fishing_type VARCHAR(100) NOT NULL, -- Municipal, Commercial, Inland, Aquaculture, Seaweed, Shellfish, Mixed
    primary_fishing_area VARCHAR(255) NOT NULL,
    fishing_area_type VARCHAR(100),
    main_species VARCHAR(150) NOT NULL,
    
    uses_vessel BOOLEAN DEFAULT false,
    vessel_name VARCHAR(150),
    vessel_type VARCHAR(100),
    vessel_ownership VARCHAR(100),
    vessel_registration_number VARCHAR(100),
    vessel_crew_capacity INT,

    aquaculture_site_type VARCHAR(100), -- Pond, Cage, Pen, Tank, Marine site
    aquaculture_site_location VARCHAR(255),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Profile Consents Table
CREATE TABLE IF NOT EXISTS profile_consents (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rsbsa_profile_id TEXT REFERENCES rsbsa_profiles(id) ON DELETE CASCADE,

    registrant_printed_name VARCHAR(255) NOT NULL,
    consent_given_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    signature_metadata TEXT,
    privacy_policy_acknowledged BOOLEAN DEFAULT true,
    da_disclaimer_acknowledged BOOLEAN DEFAULT true,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Enable RLS for all newly created tables
ALTER TABLE rsbsa_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_mobile_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_identity_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_farm_parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_fisheries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_consents ENABLE ROW LEVEL SECURITY;

-- 10. Basic RLS Policies (Owner isolation)
CREATE POLICY rsbsa_profiles_user_all ON rsbsa_profiles FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_addresses_user_all ON profile_addresses FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_mobile_contacts_user_all ON profile_mobile_contacts FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_memberships_user_all ON profile_memberships FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_identity_documents_user_all ON profile_identity_documents FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_farm_parcels_user_all ON profile_farm_parcels FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_fisheries_user_all ON profile_fisheries FOR ALL USING (auth.uid()::text = user_id);
CREATE POLICY profile_consents_user_all ON profile_consents FOR ALL USING (auth.uid()::text = user_id);
