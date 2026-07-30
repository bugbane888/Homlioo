-- ============================================
-- MIGRATION 003: Add rooms JSONB + electricity
-- Run this in Supabase SQL Editor
-- ============================================

-- Add electricity bill column (optional, admin-entered per property)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS electricity INTEGER DEFAULT NULL;

-- Add rooms JSONB column to store per-room pricing configured by admin
-- Structure: { single: { label, subtitle, rent, maintenance, security, availableBeds, attachedBathroom, acRoom, electricityBill }, ... }
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS rooms JSONB DEFAULT NULL;

-- Add status column for draft/published workflow
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
  CHECK (status IN ('draft', 'published'));

-- Add is_premium column if missing (referenced in service but may not exist)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE;

-- Add owner_name / owner_phone / cover_image / gallery_images if not already present
-- (These were added in migration 002 but we guard with IF NOT EXISTS)
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS owner_name TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS owner_phone TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS cover_image TEXT DEFAULT NULL;

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
