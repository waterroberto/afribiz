'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import generateUniqueCode from '@/utils/generateCode';
import clsx from 'clsx';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

type CodeType = 'win' | 'loss';

export interface CODE {
  _id?: string;
  used: boolean;
  code: string;
  percent: number;
  type: CodeType;
  timer: number;
}

const SignalTrading = () => {
  const [codes, setCodes] = useState<CODE[] | []>([]);
  const [codeType, setCodeType] = useState<CodeType>('win');
  const [percent, setPercent] = useState('');
  const [timer, setTimer] = useState(5000);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ref = collection(db, 'signalTrading');

    const unsubscribe = onSnapshot(ref, (snap) => {
      const CODES: CODE[] = [];
      snap.forEach((doc) => {
        const data = { ...doc.data(), _id: String(doc.id) } as CODE;
        CODES.push(data);
      });

      setCodes(CODES);
    });

    return () => unsubscribe();
  }, []);

  const validateInputs = () => {
    return (
      codeType.trim().length > 0 &&
      percent.trim().length > 0 &&
      +percent > 0 &&
      timer > 0
    );
  };

  const generateNewCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {
      const collectionRef = collection(db, 'signalTrading');

      const randomCode = generateUniqueCode(6);

      const newCode = {
        code: randomCode,
        used: false,
        percent: +percent,
        type: codeType,
        timer,
      };

      console.log(newCode);

      try {
        toast.loading('Generating new code...');

        await addDoc(collectionRef, newCode);

        toast.dismiss();
        toast.success('Code generated.');
      } catch (error) {
        console.log(error);
        toast.error('Error generating code');
      }

      closeModal();
    } else {
      toast.error('One or more inputs are invalid.');
    }
  };

  const sortedCodes = useMemo(() => {
    return codes?.sort((a, b) => {
      return a.used === b.used ? 0 : a.used ? 1 : -1;
    });
  }, [codes]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className='mt-8 text-gray-700'>
      <Card>
        <p className='text-xl font-medium mb-4'>Copy Trading Codes</p>

        <Button type='button' onClick={openModal}>
          Generate new code
        </Button>
      </Card>

      {codes && codes.length > 0 && sortedCodes ? (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {sortedCodes.map((code) => (
            <Card key={code.code}>
              <span
                className={clsx(
                  'inline-block text-xs p-2 px-4 rounded-full text-white',
                  code.used ? 'bg-red-600' : ' bg-green-700'
                )}
              >
                {code.used ? 'Used' : 'Not Used'}
              </span>
              <div className='text-sm my-6'>
                <div className='flex items-center gap-8 justify-between my-1'>
                  <p className='font-semibold'>Code:</p>
                  <p className='font-light'> {code.code} </p>
                </div>
                <div className='flex items-center gap-8 justify-between my-1'>
                  <p className='font-semibold'>Type:</p>
                  <p
                    className={clsx(
                      'font-light',
                      code.type === 'win' ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {code.type}
                  </p>
                </div>
                <div className='flex items-center gap-8 justify-between my-1'>
                  <p className='font-semibold'>Percentage:</p>
                  <p className={clsx('font-light')}>{code.percent}%</p>
                </div>
                <div className='flex items-center gap-8 justify-between my-1'>
                  <p className='font-semibold'>Duration:</p>
                  <p className={clsx('font-light')}>
                    {code.timer / 1000} seconds
                  </p>
                </div>
              </div>

              <Button
                size='small'
                onClick={() => {
                  window.navigator.clipboard
                    .writeText(code.code)
                    .then(() => toast.success('Copied!'));
                }}
                variant='outlined'
              >
                Copy
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <p className='text-3xl font-semibold p-4'>No Codes</p>
        </Card>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        handleClose={closeModal}
        title='Generate Copy Trading Code'
      >
        <form onSubmit={generateNewCode}>
          <div className='mb-4'>
            <label
              htmlFor='codeType'
              className='block text-sm text-gray-600 mb-2'
            >
              Select Code Type*
            </label>
            <select
              id='codeType'
              required
              value={codeType}
              onChange={(e) => setCodeType(e.target.value as CodeType)}
            >
              <option value='win'>Win</option>
              <option value='loss'>Loss</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='timer' className='block text-sm text-gray-600 mb-2'>
              Trading Duration*
            </label>
            <select
              id='timer'
              required
              value={timer}
              onChange={(e) => setTimer(+e.target.value)}
            >
              <option value={5000}>5 secs</option>
              <option value={10000}>10 secs</option>
              <option value={15000}>15 secs</option>
              <option value={20000}>20 secs</option>
            </select>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='percent'
              className='block text-sm text-gray-600 mb-2'
            >
              Input Profit/Loss Percentage*
            </label>
            <TextInput
              type='number'
              id='percent'
              placeholder='Percentage'
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              error={+percent <= 0 ? 'Percentage must be greater than 0%' : ''}
            />
          </div>

          <Button color='dark' rounded block type='submit'>
            Proceed
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default SignalTrading;
