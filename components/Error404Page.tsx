import Head from 'next/head';
import React from 'react';
import DefaultErrorPage from 'next/error';

export default function Error404Page() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  );
}
