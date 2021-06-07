import { Post } from 'types';
import React, { useContext } from 'react';
import PostListItem from './PostListItem';
import { SettingsContext } from 'context/Settings';

function sortPosts(a: Post, b: Post) {
  if (a.published_at === null || b.published_at === null) return 0;
  return a.published_at > b.published_at ? -1 : 1;
}

export default function PostList({ posts }: { posts: Post[] }) {
  const today = new Date().toISOString();
  const { state: settingsState } = useContext(SettingsContext);

  const sortedPosts = posts
    .filter(({ published_at }: Post) => {
      if (settingsState.unpublished === true) return true;
      else {
        return published_at !== null && published_at <= today;
      }
    })
    .sort(sortPosts);

  const postList = sortedPosts.map(({ title, published_at, preview, slug }, i) => (
    <div key={i}>
      <hr className="solid"></hr>
      <PostListItem title={title} date={published_at} preview={preview} slug={slug} />
    </div>
  ));

  return <div>{postList}</div>;
}
