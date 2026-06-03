-- ============================================
-- MIGRATION: Add WhatsApp Contact & Storage
-- ============================================

-- 1. Add new columns to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS owner_phone TEXT,
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- 2. Create Storage Bucket for Property Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Row Level Security (RLS) Policies
-- Allow anyone to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'property-images' );

-- Allow authenticated users to upload images
CREATE POLICY "Auth Insert" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'property-images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update/delete their uploaded images
CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'property-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'property-images' AND auth.role() = 'authenticated' );
