import React from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

type PropTypes = {
  name: string;
  title?: string;
};

export default function UserAvatar({ name, title = '' }: PropTypes) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex-1 text-sm'>
        <p className='font-medium text-gray-800'>{name}</p>
        <p className='text-sm text-gray-500'>{title}</p>
      </div>

      <button className='text-gray-600'>
        <IoChevronDownOutline />
      </button>
    </div>
  );
}
