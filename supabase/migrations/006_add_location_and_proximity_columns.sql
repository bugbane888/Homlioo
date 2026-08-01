-- ============================================
-- MIGRATION 006: Add location and proximity columns
-- Run this in Supabase SQL Editor
-- ============================================

-- Location columns (were missing -- caused schema cache errors on publish)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS city TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS state TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS pincode TEXT DEFAULT NULL;

-- College proximity
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS college_time TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS college_distance TEXT DEFAULT NULL;

-- Metro proximity
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS metro_time TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS metro_distance TEXT DEFAULT NULL;

-- Hospital proximity
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS hospital_time TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS hospital_distance TEXT DEFAULT NULL;

-- Gate closing time, house rules
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS gate_closing_time TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS smoking_allowed BOOLEAN DEFAULT FALSE;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS guests_allowed BOOLEAN DEFAULT FALSE;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS notice_period TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS lock_in_period TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS food_timing TEXT DEFAULT NULL;

-- Published timestamp
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT NULL;

-- Index for city filtering
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
