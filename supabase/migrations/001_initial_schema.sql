-- ============================================
-- HOMLIOO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROPERTIES TABLE (PG/Hostel listings)
CREATE TABLE IF NOT EXISTS properties (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  locality TEXT NOT NULL,
  college TEXT,
  price INTEGER NOT NULL,
  total INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Boys', 'Girls', 'Co-ed')),
  sharing TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  rooms_left INTEGER DEFAULT 0,
  amenities TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  rules TEXT[] DEFAULT '{}',
  metro TEXT,
  hospital TEXT,
  map_url TEXT,
  description TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENQUIRIES TABLE (Student leads)
CREATE TABLE IF NOT EXISTS enquiries (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
  pg_name TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FAVORITES TABLE (User saved properties)
CREATE TABLE IF NOT EXISTS favorites (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view and update their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- PROPERTIES POLICIES
CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update properties"
  ON properties FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete properties"
  ON properties FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ENQUIRIES POLICIES
CREATE POLICY "Anyone can create enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enquiries"
  ON enquiries FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update enquiries"
  ON enquiries FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete enquiries"
  ON enquiries FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- FAVORITES POLICIES
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Auto-create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA (Initial Properties)
-- ============================================

INSERT INTO properties (name, locality, college, price, total, gender, sharing, rating, reviews, verified, rooms_left, amenities, tags, rules, metro, hospital, map_url, description)
VALUES
  (
    'Sunrise Girls PG',
    'Knowledge Park II',
    '4 min walk · NIET',
    6500,
    9000,
    'Girls',
    'Double sharing',
    4.8,
    34,
    true,
    2,
    ARRAY['WiFi', 'AC', 'Food', 'CCTV', 'Laundry', 'Parking', 'Power Backup'],
    ARRAY['Women Safety', 'Verified'],
    ARRAY['Entry: Before 10 PM', 'No smoking on premises', 'Guest allowed till 8 PM', 'Monthly rent due by 5th'],
    '8 min walk · Pari Chowk Metro',
    '5 min · Yatharth Hospital',
    'https://www.google.com/maps/search/NIET+Greater+Noida',
    'A safe, clean PG for girls near NIET. All meals included, 24-hour security, and a peaceful environment for study. Managed by professional hospitality staff.'
  ),
  (
    'Dev Residency',
    'Alpha-I, Greater Noida',
    '7 min walk · GL Bajaj',
    5500,
    7900,
    'Boys',
    'Triple sharing',
    4.5,
    21,
    true,
    5,
    ARRAY['WiFi', 'Food', 'CCTV', 'Parking', 'Gym'],
    ARRAY['Budget Pick'],
    ARRAY['No loud music after 11 PM', 'Cleanliness is mandatory', 'Entry: Before 11 PM'],
    '12 min walk · Depot Station',
    '10 min · Sharda Hospital',
    'https://www.google.com/maps/search/GL+Bajaj+Greater+Noida',
    'Budget-friendly boys PG with home-cooked meals, reliable Wi-Fi, and walking distance to GL Bajaj College. Perfect for students looking for value.'
  ),
  (
    'Platinum Boys Hostel',
    'Knowledge Park IV',
    '2 min walk · Sharda Univ',
    8000,
    10500,
    'Boys',
    'Single sharing',
    4.9,
    58,
    true,
    1,
    ARRAY['WiFi', 'AC', 'Food', 'CCTV', 'Laundry', 'Parking', 'Gym', 'Power Backup'],
    ARRAY['Top Rated', 'Premium'],
    ARRAY['Biometric Entry', 'Strict Silence in Study Room', 'Guest registration required'],
    '6 min walk · Knowledge Park Metro',
    '4 min · Fortis Hospital',
    'https://www.google.com/maps/search/Sharda+University',
    'Premium single-room hostel with all amenities included. Ideal for students who value privacy and luxury near Sharda University.'
  ),
  (
    'Green Valley Co-Living',
    'Gamma-I, Greater Noida',
    '12 min walk · Bennett Univ',
    7000,
    7700,
    'Co-ed',
    'Double sharing',
    4.3,
    15,
    false,
    8,
    ARRAY['WiFi', 'AC', 'CCTV', 'Gym', 'Parking'],
    ARRAY['Co-ed', 'Modern'],
    ARRAY['Community-driven space', 'Weekly events', 'Quiet hours 12 AM - 7 AM'],
    '15 min auto · Pari Chowk Metro',
    '8 min · Metro Hospital',
    'https://www.google.com/maps/search/Bennett+University',
    'Modern co-living space with a gym and high-speed Wi-Fi. Designed for students who love to socialize and network.'
  );
