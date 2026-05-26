-- Run this SQL in your Supabase project's SQL Editor
-- (https://supabase.com → Create a free project → SQL Editor)

-- 1. Create the CMS data table
CREATE TABLE IF NOT EXISTS cms_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cms_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read" ON cms_data FOR SELECT USING (true);
CREATE POLICY "Allow anon insert/update" ON cms_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon upsert" ON cms_data FOR UPDATE USING (true);

-- 2. Create the storage bucket for file uploads
-- You can also do this via the Supabase Dashboard → Storage → Create bucket
-- Bucket name must be: portfolio
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access on the portfolio bucket
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

-- Allow authenticated uploads to the portfolio bucket
-- (Auth is handled server-side by our API routes)
CREATE POLICY "Authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio');
