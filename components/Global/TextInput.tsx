'use client';

import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';

type InputType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  error?: string | string[];
  hint?: string;
  format?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
  rounded?: boolean;
  sx?: string;
  dark?: boolean;
};

export default function TextInput(props: InputType) {
  const {
    type = 'text',
    inputMode = 'text',
    error = false,
    disabled = false,
    placeholder,
    hint,
    format = false,
    value,
    id,
    name,
    className,
    leftIcon,
    rightIcon,
    leftIconClick,
    rightIconClick,
    onChange,
    onFocus,
    onBlur,
    rounded = false,
    sx,
    dark = false,
  } = props;

  const inputStyles = `
        ${disabled && 'pointer-events-none opacity-60'}
        h-[44px] bg-transparent px-4 py-2 border
        flex gap-2 items-center
        ${rounded ? 'rounded-3xl' : 'rounded-xl'}
        ${dark ? 'border-gray-400' : 'border-gray-200'}
        ${className}
    `;

  return (
    <div className='flex flex-col w-full'>
      <div className={inputStyles}>
        {leftIcon && (
          <button
            onClick={leftIconClick}
            type='button'
            className='text-lg text-neutral cursor-pointer'
          >
            {leftIcon}
          </button>
        )}
        <input
          id={id}
          type={type}
          name={name}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={clsx(
            `h-full text-sm w-full font-light  caret-primary  leading-2 focus:outline-none block appearance-none bg-transparent`,
            dark ? 'text-gray-100 ' : 'text-gray-600',
            sx
          )}
          placeholder={placeholder}
        />
        {rightIcon && (
          <button
            type='button'
            onClick={rightIconClick}
            className='text-lg text-neutral cursor-pointer'
          >
            {rightIcon}
          </button>
        )}
      </div>
      {(error || hint) && (
        <div className='text-xs font-light mt-1 ml-1 p-2'>
          {error && <span className='text-red-600'>{error}</span>}
          {hint && <span className='text-dark-200'>{hint}</span>}
        </div>
      )}
    </div>
  );
}
