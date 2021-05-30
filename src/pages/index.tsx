import Head from 'next/head';
import FooterEnd from '../components/FooterEnd';
import allPosts from '../../posts.json';
import PostList from '../components/PostList';
import React from 'react';
import Link from 'next/link';

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
        <PostList posts={allPosts} />
        <hr className="solid"></hr>
      </main>

      <footer className="max-w-screen-sm mx-auto">
        <p className="text-center pt-16">Page 1 of 1</p>
        <FooterEnd />
      </footer>
    </div>
  );
}
