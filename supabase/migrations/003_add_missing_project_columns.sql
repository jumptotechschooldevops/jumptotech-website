-- Add missing columns to student_projects table to support the full application schema

ALTER TABLE public.student_projects
  ADD COLUMN IF NOT EXISTS student_email TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS technologies TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS demo_url TEXT,
  ADD COLUMN IF NOT EXISTS youtube_url TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS video_urls TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS screenshot_urls TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS documentation_url TEXT,
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- If the table was created manually, ensure RLS and policies are intact as a safety measure
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'student_projects' AND policyname = 'Public can view published projects') THEN
        CREATE POLICY "Public can view published projects"
            ON public.student_projects FOR SELECT
            USING (published = true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'student_projects' AND policyname = 'Authenticated users can manage all projects') THEN
        CREATE POLICY "Authenticated users can manage all projects"
            ON public.student_projects FOR ALL
            USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
            WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
    END IF;
END $$;
