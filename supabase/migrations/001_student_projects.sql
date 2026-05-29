-- Migration: Student Projects & Analytics
-- Description: Creates tables and storage buckets for Student Projects feature

-- 1. Create student_projects table
CREATE TABLE public.student_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    github_url TEXT,
    demo_url TEXT,
    youtube_url TEXT,
    thumbnail_url TEXT,
    video_urls TEXT[] DEFAULT '{}',
    screenshot_urls TEXT[] DEFAULT '{}',
    documentation_url TEXT,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for student_projects
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

-- Policies for student_projects
-- Anyone can read published projects
CREATE POLICY "Public can view published projects"
    ON public.student_projects FOR SELECT
    USING (published = true);

-- Admins (authenticated users with service role or specific auth logic) can do all
-- Assuming the admin dashboard uses service_role key or we rely on authenticated users
CREATE POLICY "Authenticated users can manage all projects"
    ON public.student_projects FOR ALL
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');


-- 2. Create project_analytics table
CREATE TABLE public.project_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE,
    views INT DEFAULT 0,
    video_plays INT DEFAULT 0,
    github_clicks INT DEFAULT 0,
    demo_clicks INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for project_analytics
CREATE POLICY "Public can read analytics"
    ON public.project_analytics FOR SELECT
    USING (true);

CREATE POLICY "Public can update analytics"
    ON public.project_analytics FOR UPDATE
    USING (true);

-- Trigger to create analytics row when a project is created
CREATE OR REPLACE FUNCTION public.create_project_analytics()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.project_analytics (project_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_project_created
    AFTER INSERT ON public.student_projects
    FOR EACH ROW EXECUTE FUNCTION public.create_project_analytics();


-- 3. Create project_testimonials table
CREATE TABLE public.project_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    job_title TEXT,
    company_name TEXT,
    testimonial TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for project_testimonials
CREATE POLICY "Public can view testimonials"
    ON public.project_testimonials FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
    ON public.project_testimonials FOR ALL
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');


-- 4. Create Storage Buckets (if they don't exist, this requires superuser or API creation typically, but we can provide the SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('student-project-videos', 'student-project-videos', true),
  ('student-project-images', 'student-project-images', true),
  ('student-project-documents', 'student-project-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Allow public read access to the buckets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('student-project-videos', 'student-project-images', 'student-project-documents'));

-- Allow authenticated users to upload/modify objects
CREATE POLICY "Authenticated users can upload objects" ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('student-project-videos', 'student-project-images', 'student-project-documents') AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

CREATE POLICY "Authenticated users can update objects" ON storage.objects FOR UPDATE
USING (bucket_id IN ('student-project-videos', 'student-project-images', 'student-project-documents') AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

CREATE POLICY "Authenticated users can delete objects" ON storage.objects FOR DELETE
USING (bucket_id IN ('student-project-videos', 'student-project-images', 'student-project-documents') AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));
CREATE OR REPLACE FUNCTION increment_project_view(project_id UUID) RETURNS VOID AS $$ BEGIN UPDATE public.project_analytics SET views = views + 1 WHERE project_id = $1; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
