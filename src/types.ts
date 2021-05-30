export interface Post {
  title: string;
  slug: string;
  content: string;
  preview: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}
