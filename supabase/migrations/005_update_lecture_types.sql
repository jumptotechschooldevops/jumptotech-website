-- Migration: Add lecture type and external URL
-- Description: Adds lecture_type and external_url columns to support external lectures.

ALTER TABLE public.lectures
ADD COLUMN IF NOT EXISTS lecture_type TEXT DEFAULT 'internal',
ADD COLUMN IF NOT EXISTS external_url TEXT;
