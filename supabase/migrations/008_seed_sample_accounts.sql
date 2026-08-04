-- AgriHub PH Sample Accounts Seed Migration
-- Migration: 008_seed_sample_accounts.sql
-- Seeds 1 Coop Account, 1 Farmer Account (connected to Coop), and 1 B2B Buyer Account

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Seed auth.users records (Idempotent ON CONFLICT DO NOTHING)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at
) VALUES 
  (
    '11111111-1111-4111-a111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'coop.admin@agrihub.ph',
    crypt('CoopManager2026!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Benguet Coop Manager", "primary_role": "coop"}',
    'authenticated',
    'authenticated',
    now(),
    now()
  ),
  (
    '22222222-2222-4222-a222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'juan.farmer@agrihub.ph',
    crypt('FarmerJuan2026!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Juanito Dela Cruz", "primary_role": "farmer"}',
    'authenticated',
    'authenticated',
    now(),
    now()
  ),
  (
    '33333333-3333-4333-a333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'buyer.santos@agrihub.ph',
    crypt('ManilaBuyer2026!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Maria Santos", "primary_role": "buyer"}',
    'authenticated',
    'authenticated',
    now(),
    now()
  )
ON CONFLICT (id) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- 2. Seed public.profiles
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  province,
  city_municipality,
  primary_commodity,
  preferred_language,
  created_at,
  updated_at
) VALUES
  (
    '11111111-1111-4111-a111-111111111111',
    'Benguet Coop Manager',
    'coop.admin@agrihub.ph',
    '0917-555-0101',
    'Benguet',
    'La Trinidad',
    'Highland Vegetables',
    'Filipino',
    now(),
    now()
  ),
  (
    '22222222-2222-4222-a222-222222222222',
    'Juanito Dela Cruz',
    'juan.farmer@agrihub.ph',
    '0917-555-0202',
    'Benguet',
    'Atok',
    'Benguet Cabbage',
    'Filipino',
    now(),
    now()
  ),
  (
    '33333333-3333-4333-a333-333333333333',
    'Maria Santos',
    'buyer.santos@agrihub.ph',
    '0917-555-0303',
    'Metro Manila',
    'Quezon City',
    'Highland Vegetables & Fresh Produce',
    'Taglish',
    now(),
    now()
  )
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email;

-- 3. Seed public.user_roles
INSERT INTO public.user_roles (user_id, role, is_primary) VALUES
  ('11111111-1111-4111-a111-111111111111', 'coop', true),
  ('22222222-2222-4222-a222-222222222222', 'farmer', true),
  ('33333333-3333-4333-a333-333333333333', 'buyer', true)
ON CONFLICT (user_id, role) DO UPDATE SET is_primary = EXCLUDED.is_primary;

-- 4. Seed public.organizations (Coop & Buyer Business)
INSERT INTO public.organizations (
  id,
  owner_id,
  name,
  type,
  registration_number,
  contact_email,
  contact_phone,
  province,
  city_municipality,
  verification_status,
  created_at,
  updated_at
) VALUES
  (
    'c0000000-0000-4000-a000-000000000001',
    '11111111-1111-4111-a111-111111111111',
    'Benguet Highland Farmers Agricultural Cooperative',
    'cooperative',
    'CDA-9520-10023451',
    'coop.admin@agrihub.ph',
    '0917-555-0101',
    'Benguet',
    'La Trinidad',
    'VERIFIED',
    now(),
    now()
  ),
  (
    'b0000000-0000-4000-a000-000000000001',
    '33333333-3333-4333-a333-333333333333',
    'Metro Manila Fresh Harvest Wholesalers Inc.',
    'buyer',
    'TIN-102-345-678-000',
    'buyer.santos@agrihub.ph',
    '0917-555-0303',
    'Metro Manila',
    'Quezon City',
    'VERIFIED',
    now(),
    now()
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  verification_status = EXCLUDED.verification_status;

-- 5. Seed public.organization_memberships (Connects Farmer Juanito to Coop BHFAC)
INSERT INTO public.organization_memberships (
  organization_id,
  user_id,
  role_in_organization,
  status,
  created_at
) VALUES
  (
    'c0000000-0000-4000-a000-000000000001',
    '11111111-1111-4111-a111-111111111111',
    'admin_manager',
    'ACTIVE',
    now()
  ),
  (
    'c0000000-0000-4000-a000-000000000001',
    '22222222-2222-4222-a222-222222222222',
    'member_farmer',
    'ACTIVE',
    now()
  )
ON CONFLICT (organization_id, user_id) DO UPDATE SET
  role_in_organization = EXCLUDED.role_in_organization,
  status = EXCLUDED.status;

-- 6. Seed RSBSA Profile for Farmer Juanito Dela Cruz
INSERT INTO public.rsbsa_profiles (
  id,
  user_id,
  transaction_code,
  phil_id_pcn,
  rsbsa_number,
  surname,
  first_name,
  middle_name,
  has_no_middle_name,
  sex,
  date_of_birth,
  civil_status,
  highest_formal_education,
  religion,
  livelihood_farmer,
  registration_status,
  profile_completion_percentage,
  created_at,
  updated_at
) VALUES (
  'r0000000-0000-4000-a000-000000000001',
  '22222222-2222-4222-a222-222222222222',
  'TX-2026-BHFAC-001',
  '1234-5678-9012-3456',
  'RSBSA-14-11-02-004-001289',
  'Dela Cruz',
  'Juanito',
  'Bautista',
  false,
  'male',
  '1985-06-15',
  'married',
  'High School (non K-12)',
  'Christianity',
  true,
  'verified',
  100.0,
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  rsbsa_number = EXCLUDED.rsbsa_number,
  registration_status = EXCLUDED.registration_status;

-- 7. Seed Profile Address for Farmer Juanito
INSERT INTO public.profile_addresses (
  id,
  user_id,
  rsbsa_profile_id,
  address_type,
  house_lot_bldg_purok,
  street_sitio_subdivision,
  barangay,
  city_municipality,
  province,
  region,
  created_at,
  updated_at
) VALUES (
  'a0000000-0000-4000-a000-000000000001',
  '22222222-2222-4222-a222-222222222222',
  'r0000000-0000-4000-a000-000000000001',
  'permanent',
  'Purok 3',
  'Sitio Sayangan',
  'Sayangan',
  'Atok',
  'Benguet',
  'CAR',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Profile Mobile Contact for Farmer Juanito
INSERT INTO public.profile_mobile_contacts (
  id,
  user_id,
  rsbsa_profile_id,
  mobile_number,
  is_owned,
  created_at,
  updated_at
) VALUES (
  'm0000000-0000-4000-a000-000000000001',
  '22222222-2222-4222-a222-222222222222',
  'r0000000-0000-4000-a000-000000000001',
  '0917-555-0202',
  true,
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- 9. Seed Profile Membership Linking Farmer Juanito to BHFAC Coop
INSERT INTO public.profile_memberships (
  id,
  user_id,
  rsbsa_profile_id,
  organization_name,
  organization_type,
  created_at
) VALUES (
  'pm000000-0000-4000-a000-000000000001',
  '22222222-2222-4222-a222-222222222222',
  'r0000000-0000-4000-a000-000000000001',
  'Benguet Highland Farmers Agricultural Cooperative',
  'fca_ia_coop',
  now()
)
ON CONFLICT (id) DO NOTHING;
