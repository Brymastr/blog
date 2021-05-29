import { useRouter } from 'next/router';
import posts from '../../../posts.json';
import React, { useEffect } from 'react';
import FooterEnd from '../../../components/FooterEnd';
import { format } from 'date-fns';
import HomeButton from '../../../components/HomeButton';
import Error404Page from '../../../components/Error404Page';
import styles from '../../../styles/Post.module.scss';
import highlightCode from '../../../components/Highlight';

function formatCodeBlocks() {
  highlightCode();
  const blocks = document.querySelectorAll('pre code.hljs');
  Array.prototype.forEach.call(blocks, function (block) {
    const language = block.result.language;
    if (language != undefined) block.insertAdjacentHTML('afterbegin', `<label>${language}</label>`);
  });
}

type PostProps = {
  title: string;
  date: string;
  content: string;
};

const PostPage = ({ title, date, content }: PostProps) => {
  const readTime = Math.round(content.split(' ').length / 200);
  const meta = readTime >= 1 ? `${date} | ${readTime} min read` : date;

  return (
    <>
      <HomeButton />

      <div className="container mx-auto px-5">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 mb-5">{meta}</p>
        </div>
        <hr className="solid pt-12"></hr>

        <div id="post-content" className={styles.post} dangerouslySetInnerHTML={{ __html: content }} />

        <FooterEnd />
      </div>
    </>
  );
};

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(formatCodeBlocks);

  const post = posts.find(x => x.slug === slug);

  let element: JSX.Element;

  if (!post) {
    element = Error404Page();
  } else {
    const date = format(new Date(post.published_at as string), 'dd MMM yyyy');
    const { title, content } = post;

    element = PostPage({ title, date, content });
  }

  return element;
};

export default Post;
