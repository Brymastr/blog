import { Post } from 'types';
import React from 'react';
import PostListItem from './PostListItem';

function sortPosts(a: Post, b: Post) {
  if (a.published_at === null || b.published_at === null) return 0;
  return a.published_at > b.published_at ? -1 : 1;
}

export default function PostList({ posts }: { posts: Post[] }) {
  const today = new Date().toISOString();

  const sortedPosts = posts
    .filter(({ published_at }: Post) => published_at !== null && published_at <= today)
    .sort(sortPosts);

  const postList = sortedPosts.map(({ title, published_at, preview, slug }, i) => (
    <div key={i}>
      <hr className="solid"></hr>
      <PostListItem title={title} date={published_at as string} preview={preview} slug={slug} />
    </div>
  ));

  return <div>{postList}</div>;
}
