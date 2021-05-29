import { useRouter } from 'next/router';
import posts from '../../../posts.json';
import React from 'react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import FooterEnd from '../../../components/FooterEnd';
import { format } from 'date-fns';

const ErrorPage = () => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <DefaultErrorPage statusCode={404} />
  </>
);

type PostProps = {
  title: string;
  date: string;
  content: string;
};

const PostPage = ({ title, date, content }: PostProps) => {
  const readTime = Math.round(content.split(' ').length / 200);
  const meta =
    readTime >= 1 ? (
      <>
        {date} | {readTime} min read
      </>
    ) : (
      <>{date}</>
    );

  return (
    <>
      <div className="flex justify-between  text-gray-400 p-5">
        <Link href="/">
          <a className="rounded-full border-gray-400 border-solid border p-2 px-4">&#60; Home</a>
        </Link>
      </div>

      <div className="container mx-auto">
        <div className="py-12">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 mb-5">{meta}</p>
        </div>
        <hr className="solid pt-12"></hr>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <FooterEnd />
      </div>
    </>
  );
};

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const post = posts.find(x => x.slug === slug);

  let element: JSX.Element;

  if (!post) {
    element = ErrorPage();
  } else {
    const date = format(new Date(post.published_at), 'dd MMM yyyy');
    const { title, content } = post;

    element = PostPage({ title, date, content });
  }

  return element;
};

export default Post;
