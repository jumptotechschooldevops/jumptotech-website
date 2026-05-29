export type StudentProject = {
  id: string;
  title: string;
  student_name: string;
  student_email: string;
  description: string;
  category: string;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
  youtube_url: string | null;
  thumbnail_url: string | null;
  video_urls: string[];
  screenshot_urls: string[];
  documentation_url: string | null;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectAnalytics = {
  id: string;
  project_id: string;
  views: number;
  video_plays: number;
  github_clicks: number;
  demo_clicks: number;
  updated_at: string;
};

export type ProjectTestimonial = {
  id: string;
  project_id: string;
  student_name: string;
  job_title: string | null;
  company_name: string | null;
  testimonial: string;
  photo_url: string | null;
  created_at: string;
};
