import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ButtonProps {
  handleClick: () => void;
}

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  closeButton?: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

function CloseButton({ handleClick }: ButtonProps) {
  return (
    <button
      className='p-2 bg-gray-100 text-xl rounded-full text-secondary-text'
      onClick={handleClick}
    >
      <AiOutlineClose />
    </button>
  );
}

const Modal = ({
  title,
  isOpen = false,
  handleClose,
  closeButton = true,
  children,
}: ModalProps) => {
  if (!isOpen) return;

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] p-4 modal-overlay z-50 duration-500 backdrop-blur-sm`}
    >
      <div className='p-6 w-full max-w-2xl bg-primary rounded-2xl duration-500 max-h-[640px] overflow-y-auto'>
        <div className='flex items-center justify-between mb-8'>
          <p className='text-neutral font-semibold text-xl capitalize'>
            {title ?? ''}
          </p>
          {closeButton && <CloseButton handleClick={handleClose} />}
        </div>

        <div className='text-gray-700'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
