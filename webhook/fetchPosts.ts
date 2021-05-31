import { AxiosInstance } from 'axios';
import { GhostPost, GhostPostsResponse, Post } from './types';
import { setTimeout as sleep } from 'timers/promises';

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

async function fetch(client: AxiosInstance) {
  const maxAttempts = 10;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const result = await client.get<GhostPostsResponse>('/posts?formats=html');
      return result;
    } catch (err) {
      console.error(err.response.statusText);
      if (i < maxAttempts) await sleep(i * 100);
    }
  }
  throw new Error('Error fetching posts');
}

export default async function fetchPosts(client: AxiosInstance) {
  const posts = await fetch(client);
  const normalizedPosts = posts.data.posts.map(normalize);

  return normalizedPosts;
}
