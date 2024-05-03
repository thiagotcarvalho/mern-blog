import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex p-7 bg-stone-200">
      <h3 className="flex-1 m-0 text-3xl font-bold">MERN Blog App</h3>
      <ul className="flex gap-5 list-none">
        <Link href={'/'}>
          <li className="text-base font-bold hover:text-teal-600">Home</li>
        </Link>
        <Link href={'/add-blog-post'}>
          <li className="text-base font-bold hover:text-teal-600">Add Blog Post</li>
        </Link>
      </ul>
    </div>
  );
}