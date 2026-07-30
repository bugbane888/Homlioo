-- ============================================================
-- MIGRATION 005: Favorites Table + RLS Policies
-- Run this in Supabase SQL Editor
-- ============================================================

-- Create favorites table (for saved/bookmarked properties)
CREATE TABLE IF NOT EXISTS public.favorites (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id  BIGINT NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)  -- prevents duplicate saves
);

-- Index for fast lookup by user
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_property_id ON public.favorites(property_id);

-- RLS: enable row-level security
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Policy: users can only read their own favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can insert their own favorites
CREATE POLICY "Users can add favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can delete their own favorites
CREATE POLICY "Users can remove favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================================
-- MIGRATION 006: Enquiries Table + RLS Policies
-- ============================================================

CREATE TABLE IF NOT EXISTS public.enquiries (
  id            BIGSERIAL PRIMARY KEY,
  student_name  TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  message       TEXT,
  property_id   BIGINT REFERENCES public.properties(id) ON DELETE SET NULL,
  pg_name       TEXT,
  status        TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON public.enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can insert an enquiry (students submitting contact forms)
CREATE POLICY "Anyone can submit enquiry"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

-- Policy: only authenticated users with admin role can read enquiries
-- (This relies on a profiles table with a 'role' column)
CREATE POLICY "Admins can view all enquiries"
  ON public.enquiries FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Policy: admins can update enquiry status
CREATE POLICY "Admins can update enquiries"
  ON public.enquiries FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Policy: admins can delete enquiries
CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Enable real-time for enquiries
ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;


-- ============================================================
-- MIGRATION 007: Properties RLS Policies
-- ============================================================

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can read published properties
CREATE POLICY "Public can read published properties"
  ON public.properties FOR SELECT
  USING (status = 'published');

-- Admins can read all properties (including drafts)
CREATE POLICY "Admins can read all properties"
  ON public.properties FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Admins can insert properties
CREATE POLICY "Admins can insert properties"
  ON public.properties FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Admins can update properties
CREATE POLICY "Admins can update properties"
  ON public.properties FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Admins can delete properties
CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Enable real-time for properties
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
