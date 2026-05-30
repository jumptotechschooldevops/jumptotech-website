-- Ensure buckets exist
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('student-project-images', 'student-project-images', true),
  ('student-project-documents', 'student-project-documents', true),
  ('student-project-videos', 'student-project-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if any to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload objects" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update objects" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete objects" ON storage.objects;

-- Create explicit policies
CREATE POLICY "Public Select Access"
ON storage.objects FOR SELECT
USING (bucket_id IN ('student-project-images', 'student-project-documents', 'student-project-videos'));

CREATE POLICY "Authenticated users can upload objects"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id IN ('student-project-images', 'student-project-documents', 'student-project-videos')
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update objects"
ON storage.objects FOR UPDATE
USING (
    bucket_id IN ('student-project-images', 'student-project-documents', 'student-project-videos')
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete objects"
ON storage.objects FOR DELETE
USING (
    bucket_id IN ('student-project-images', 'student-project-documents', 'student-project-videos')
    AND auth.role() = 'authenticated'
);
