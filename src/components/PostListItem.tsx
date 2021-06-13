import Link from 'next/link';
import { format } from 'date-fns';
import styles from 'styles/PostListItem.module.scss';

type Props = {
  title: string;
  preview: string | null;
  slug: string;
  date: string | null;
};

const PostListItem = ({ title, date, preview, slug }: Props) => {
  const publishedDate = date ? new Date(date) : new Date();
  const formattedDate = format(publishedDate, 'dd MMM yyyy');

  const unpublished = date === null || publishedDate > new Date() ? ' | Unpublished' : '';

  const href = `/posts/${slug}`;

  return (
    <Link href={href}>
      <div className={`${styles.postListItem} py-24 cursor-pointer`}>
        <h3 className="text-3xl font-bold mb-2 transition-colors">{title}</h3>
        <p className="text-gray-400 mb-5">
          {formattedDate}
          {unpublished}
        </p>
        <p>{preview}</p>
      </div>
    </Link>
  );
};

export default PostListItem;
