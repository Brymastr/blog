import posts from '../../../../posts.json';
import { useEffect } from 'react';
import FooterEnd from 'components/FooterEnd';
import HomeButton from 'components/HomeButton';
import styles from 'styles/Post.module.scss';
import formatCodeBlocks from 'components/Highlight';
import { GetStaticProps, GetStaticPaths } from 'next';
import { format } from 'date-fns';
import { pipe } from 'pipe-and-compose';

type PostProps = {
  title: string;
  date: string;
  content: string;
};

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const slugParam = params?.slug ?? '';
  const post = posts.find(({ slug }) => slugParam === slug);
  if (post === undefined) return { notFound: true };

  const date = post.published_at ? format(new Date(post.published_at), 'dd MMM yyyy') : 'Draft';
  const { title, content } = post;
  return { props: { title, date, content } };
};

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
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

function rewriteImageUrls(content: string) {
  return content.replace(/http:\/\/localhost:3001\/content/g, '');
}

const Post = ({ title, date, content }: PostProps) => {
  useEffect(formatCodeBlocks);

  const readTime = Math.round(content.split(' ').length / 200);
  const meta = readTime >= 1 ? `${date} | ${readTime} min read` : date;

  const __html = pipe(addDataTextAttr, rewriteImageUrls)(content);

  return (
    <>
      <HomeButton />

      <div className="container mx-auto px-5">
        <div className="py-12">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-gray-400 mb-5">{meta}</p>
        </div>
        <hr className="solid pt-12"></hr>

        <div id="post-content" className={styles.post} dangerouslySetInnerHTML={{ __html }} />

        <FooterEnd />
      </div>
    </>
  );
};

export default Post;
