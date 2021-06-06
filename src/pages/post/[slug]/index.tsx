import { useRouter } from 'next/router';
import posts from '../../../../posts.json';
import React, { useEffect } from 'react';
import FooterEnd from 'components/FooterEnd';
import { format } from 'date-fns';
import HomeButton from 'components/HomeButton';
import Error404Page from 'components/Error404Page';
import styles from 'styles/Post.module.scss';
import formatCodeBlocks from 'components/Highlight';

type PostProps = {
  title: string;
  date: string;
  content: string;
};

function addDataTextAttr(content: string) {
  const anchors = content.match(/(<a[^>]*>([^<]+)<\/a>)/g) ?? [];
  const modifiedAnchors = anchors.map(x => {
    const text = x.match(/>(.+)</) ?? [];
    return `${x.substr(0, 2)} data-text="${text[1]}" ${x.substr(3, x.length - 1)}`;
  });

  let modifiedContent = content;
  for (let i = 0; i < modifiedAnchors.length; i++) {
    modifiedContent = modifiedContent.replace(anchors[i], modifiedAnchors[i]);
  }

  return modifiedContent;
}

const PostPage = ({ title, date, content }: PostProps) => {
  const readTime = Math.round(content.split(' ').length / 200);
  const meta = readTime >= 1 ? `${date} | ${readTime} min read` : date;

  const modifiedContent = addDataTextAttr(content);

  return (
    <>
      <HomeButton />

      <div className="container mx-auto px-5">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 mb-5">{meta}</p>
        </div>
        <hr className="solid pt-12"></hr>

        <div
          id="post-content"
          className={styles.post}
          dangerouslySetInnerHTML={{ __html: modifiedContent }}
        />

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
    let date: string;
    if (post.published_at) date = format(new Date(post.published_at), 'dd MMM yyyy');
    else date = 'Draft';
    const { title, content } = post;

    element = PostPage({ title, date, content });
  }

  return element;
};

export default Post;
