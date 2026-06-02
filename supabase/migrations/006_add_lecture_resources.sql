-- Migration: Add resources to lectures
-- Description: Adds a resources JSONB column to the lectures table for storing an array of external resources.

ALTER TABLE public.lectures
ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT '[]'::jsonb;
