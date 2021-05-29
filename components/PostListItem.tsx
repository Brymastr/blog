import React, { FunctionComponent } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  title: string;
  preview: string;
  slug: string;
  date: string;
};

const PostListItem: FunctionComponent<Props> = ({ title, date, preview, slug }) => {
  const formattedDate = format(new Date(date), 'dd MMM yyyy');

  return (
    <div className="py-24">
      <Link href={`post/${slug}`}>
        <h3 className="text-3xl font-bold mb-2 cursor-pointer">{title}</h3>
      </Link>
      <p className="text-gray-400 mb-5">{formattedDate}</p>
      <p>{preview}</p>
    </div>
  );
};

export default PostListItem;
