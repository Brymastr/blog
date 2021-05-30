import axios from 'axios';
import fs from 'fs';
const apiKey = 'cb46c887b243709676bd1712e0';
const url = `http://localhost:3001/ghost/api/v3/content/posts?key=${apiKey}`;

interface GhostPostsResponse {
  posts: GhostPost[];
}

interface GhostPost {
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
  send_email_when_published: false;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface Post {
  title: string;
  slug: string;
  content: string;
  preview: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

function normalize(ghostPost: GhostPost) {
  const post: Post = {
    title: ghostPost.title,
    slug: ghostPost.slug,
    content: ghostPost.html,
    preview: ghostPost.custom_excerpt,
    created_at: ghostPost.created_at,
    updated_at: ghostPost.updated_at,
    published_at: ghostPost.published_at,
  };

  return post;
}

async function main() {
  const posts = await axios.get<GhostPostsResponse>(url);
  const normalizedPosts = posts.data.posts.map(normalize);

  const stringified = JSON.stringify(normalizedPosts, null, 2);

  fs.writeFileSync('posts.json', stringified);
}

main();
