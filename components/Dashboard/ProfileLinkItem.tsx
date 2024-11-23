import Link from 'next/link';
import React from 'react';
import { MdArrowRight } from 'react-icons/md';

export default function ProfileLinkItem({
  icon = <MdArrowRight />,
  pageUrl,
  pageName,
}: {
  icon?: React.ReactNode;
  pageUrl: string;
  pageName: string;
}) {
  return (
    <Link
      href={pageUrl}
      className='flex justify-between items-center p-3 capitalize bg-gray-200 rounded-lg text-sm text-neutral font-medium my-2'
    >
      {pageName}
      <span className='text-2xl'>{icon}</span>
    </Link>
  );
}
