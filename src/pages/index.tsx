import Head from 'next/head';
import PostListItem from '../components/PostListItem';
import FooterEnd from '../components/FooterEnd';
import allPosts from '../../posts.json';
import React from 'react';
import Link from 'next/link';

interface IPost {
  title: string;
  slug: string;
  content: string;
  preview: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

function sortPosts(a: IPost, b: IPost) {
  if (a.published_at === null || b.published_at === null) return 0;
  return a.published_at > b.published_at ? -1 : 1;
}

function PostsList() {
  const today = new Date().toISOString();
  const posts = allPosts as IPost[];
  const sortedPosts = posts
    .filter(({ published_at }: IPost) => published_at !== null && published_at <= today)
    .sort(sortPosts);

  const postList = sortedPosts.map(({ title, published_at, preview, slug }, i) => (
    <div key={i}>
      <hr className="solid"></hr>
      <PostListItem title={title} date={published_at as string} preview={preview} slug={slug} />
    </div>
  ));

  return <div>{postList}</div>;
}

export default function Home() {
  const linkedin = 'https://www.linkedin.com/in/brycen/';
  const github = 'https://github.com/Brymastr';

  return (
    <div>
      <Head>
        <title>Brycen Dorsay | dorsay.dev</title>
        <meta name="description" content="dorsay.dev | Brycen Dorsay | Software Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-col items-center py-24">
        <h1 className="text-5xl font-bold">Brycen Dorsay</h1>
        <h2 className="text-2xl py-2">Software Engineering</h2>
        <div className="flex justify-between w-32 pt-10">
          <Link href={linkedin}>
            <a className="cursor-pointer hover:text-red-400 transition-colors">LinkdIn</a>
          </Link>
          <Link href={github}>
            <a className="cursor-pointer hover:text-red-400 transition-colors">GitHub</a>
          </Link>
        </div>
      </header>

      <main className="max-w-screen-sm mx-auto px-3">
        <PostsList />
        <hr className="solid"></hr>
      </main>

      <footer className="max-w-screen-sm mx-auto">
        <p className="text-center pt-16">Page 1 of 1</p>
        <FooterEnd />
      </footer>
    </div>
  );
}
