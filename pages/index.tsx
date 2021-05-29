import Head from 'next/head';
import PostListItem from '../components/PostListItem';
import FooterEnd from '../components/FooterEnd';
import posts from '../posts.json';

function PostsList() {
  const sortedPosts = posts.sort((a, b) => (a.published_at > b.published_at ? -1 : 1));

  const postList = sortedPosts.map(({ title, published_at, preview, slug }, i) => (
    <div key={i}>
      <hr className="solid"></hr>
      <PostListItem title={title} date={published_at} preview={preview} slug={slug} />
    </div>
  ));

  return <div>{postList}</div>;
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-center py-32">
        <h1 className="text-5xl font-bold">Brycen Dorsay</h1>
        <h2 className="text-2xl py-2">Software Engineering</h2>
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
