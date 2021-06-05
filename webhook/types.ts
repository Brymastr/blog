export interface Post {
  title: string;
  slug: string;
  content: string;
  preview: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface GhostPostsResponse {
  posts: GhostPost[];
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: false;
  visibility: string;
  email_recipient_filter: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  status: 'published' | 'draft';
  send_email_when_published: false;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}
