-- Migration: Update lectures table
-- Description: Adds missing columns used by the application to the lectures table.

ALTER TABLE public.lectures
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS pdf_url TEXT,
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
