'use client';
import { CgSpinner } from 'react-icons/cg';

const colors = {
  primary: '#26a17b',
  secondary: '#F73164',
  tertiary: '#EAB308',
  'primary-2': '#0D6EFD',
  dark: '#111111',
  neutral: '#667085',
  success: '#22c55e',
  danger: '#ef4444',
};

// Check if the type match the colors type
function isValidColor(color: string): color is keyof typeof colors {
  return Object.keys(colors).includes(color);
}

const sizes = {
  small: 'px-6 py-2 text-xs',
  medium: 'px-8 py-3 text-sm',
  large: 'px-12 py-5 text-lg',
};

interface ButtonType {
  variant?: 'fill' | 'text' | 'outlined';
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  bold?: boolean;
  children: React.ReactNode;
  rounded?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export default function Button({
  variant = 'fill',
  type = 'button',
  disabled = false,
  loading = false,
  block = false,
  size = 'medium',
  color = 'primary',
  className = '',
  onClick,
  bold = false,
  children,
  rounded = false,
  endIcon = null,
  startIcon = null,
}: ButtonType) {
  // Accessibility improvements
  const ariaDisabled = disabled ? 'true' : undefined;

  const mainColor = Object.keys(colors).includes(color)
    ? isValidColor(color)
      ? colors[color]
      : undefined
    : color;

  const loaderStyle = {
    color: variant == 'fill' ? 'white' : mainColor,
  };

  const variants = {
    outlined: {
      background: 'transparent',
      color: mainColor,
      border: `1px solid ${mainColor}`,
    },
    text: {
      background: 'transparent',
      color: mainColor,
    },
    fill: {
      background: mainColor,
      color: 'white',
    },
  };

  const variantStyles = variants[variant];

  const otherStyles = `
          ${sizes[size]}
          ${bold ? 'font-medium' : ''}
          ${block ? 'max-w-full min-w-full w-full text-center' : 'w-fit'}
          ${loading ? 'pointer-events-none' : ''}
          ${disabled ? 'opacity-60' : 'hover:opacity-95'}
          active:opacity-90 text-center relative ${
            rounded ? 'rounded-full' : 'rounded-xl'
          }`;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={ariaDisabled}
      className={otherStyles}
      style={variantStyles}
      onClick={onClick}
    >
      <div
        style={{ opacity: loading ? 0 : 1 }}
        className={`text-center flex items-center justify-center gap-2 capitalize font-medium text-xs ${className}`}
      >
        {startIcon && <span className='text-lg'>{startIcon}</span>}
        {children}
        {endIcon && <span className='text-lg'>{endIcon}</span>}
      </div>

      {loading && (
        <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <CgSpinner style={loaderStyle} size={25} className='animate-spin' />
        </span>
      )}
    </button>
  );
}
