import { format } from 'date-fns';
import Link from 'next/link';
import styles from 'styles/PostListItem.module.scss';

type Props = {
  title: string;
  preview: string | null;
  slug: string;
  date: string;
};

const PostListItem = ({ title, date, preview, slug }: Props) => {
  const formattedDate = format(new Date(date), 'dd MMM yyyy');

  return (
    <Link href={`/post/${slug}`}>
      <div className={`${styles.postListItem} py-24 cursor-pointer`}>
        <h3 className="text-3xl font-bold mb-2 transition-colors">{title}</h3>
        <p className="text-gray-400 mb-5">{formattedDate}</p>
        <p>{preview}</p>
      </div>
    </Link>
  );
};

export default PostListItem;
