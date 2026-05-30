-- Fix schema mismatch between the application and the database.
-- The user's live database reportedly has: live_demo_url, youtube_video_url, video_url, document_url, screenshots.
-- The app expects: demo_url, youtube_url, video_urls, documentation_url, screenshot_urls.

DO $$
BEGIN
    -- Safe column transfer: If both exist, we can drop the old one. If only the old exists, we can rename it.

    -- 1. live_demo_url -> demo_url
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='live_demo_url') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='demo_url') THEN
            ALTER TABLE public.student_projects RENAME COLUMN live_demo_url TO demo_url;
        ELSE
            ALTER TABLE public.student_projects DROP COLUMN live_demo_url;
        END IF;
    END IF;

    -- 2. youtube_video_url -> youtube_url
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='youtube_video_url') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='youtube_url') THEN
            ALTER TABLE public.student_projects RENAME COLUMN youtube_video_url TO youtube_url;
        ELSE
            ALTER TABLE public.student_projects DROP COLUMN youtube_video_url;
        END IF;
    END IF;

    -- 3. document_url -> documentation_url
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='document_url') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='documentation_url') THEN
            ALTER TABLE public.student_projects RENAME COLUMN document_url TO documentation_url;
        ELSE
            ALTER TABLE public.student_projects DROP COLUMN document_url;
        END IF;
    END IF;

    -- 4. video_url -> video_urls (Array)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='video_url') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='video_urls') THEN
            ALTER TABLE public.student_projects RENAME COLUMN video_url TO video_urls;
            ALTER TABLE public.student_projects ALTER COLUMN video_urls TYPE text[] USING ARRAY[video_urls];
        ELSE
            ALTER TABLE public.student_projects DROP COLUMN video_url;
        END IF;
    END IF;

    -- 5. screenshots -> screenshot_urls (Array)
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='screenshots') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='student_projects' AND column_name='screenshot_urls') THEN
            ALTER TABLE public.student_projects RENAME COLUMN screenshots TO screenshot_urls;
            BEGIN
                ALTER TABLE public.student_projects ALTER COLUMN screenshot_urls TYPE text[] USING ARRAY[screenshot_urls];
            EXCEPTION WHEN OTHERS THEN
                -- Do nothing if cast fails
            END;
        ELSE
            ALTER TABLE public.student_projects DROP COLUMN screenshots;
        END IF;
    END IF;

END $$;

-- Finally, ensure all expected application schema columns exist.
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
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
