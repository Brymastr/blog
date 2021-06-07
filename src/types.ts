export interface Post {
  title: string;
  slug: string;
  content: string;
  preview: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}
