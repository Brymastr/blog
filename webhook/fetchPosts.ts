import { AxiosInstance } from 'axios';
import { GhostPost, GhostPostsResponse, Post } from './types';

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

export default async function fetchPosts(client: AxiosInstance) {
  const posts = await client.get<GhostPostsResponse>('/posts?formats=html');
  const normalizedPosts = posts.data.posts.map(normalize);

  return normalizedPosts;
}
