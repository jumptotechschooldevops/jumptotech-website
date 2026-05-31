export interface DbModule {
  id: string;
  slug: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  cover_image: string;
  total_hours: number;
  published: boolean;
  order_index: number;
  lectureCount?: number;
  labCount?: number;
}

export interface DbLecture {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  content: string | null;
  duration: string;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
  published: boolean;
  order_index: number;
}

export interface DbLab {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  difficulty: string;
  duration: string;
  lab_file_url: string | null;
  published: boolean;
  order_index: number;
}

export interface DbQuiz {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  passing_score: number;
  published: boolean;
}

export interface DbQuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: string;
  order_index: number;
}
