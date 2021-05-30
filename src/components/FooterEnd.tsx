import Link from 'next/link';

export default function FooterEnd() {
  return (
    <div className="pt-16">
      <hr className="solid"></hr>
      <div className="flex justify-between text-gray-400 pb-24 pt-2 text-sm">
        <Link href="https://github.com/Brymastr/blog">
          <p className="cursor-pointer hover:text-red-400 transition-colors">Site by me</p>
        </Link>
        <p>Next.js and Typescript</p>
      </div>
    </div>
  );
}
