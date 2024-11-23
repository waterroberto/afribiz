'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import { db } from '@/config/firebase.config';
import clsx from 'clsx';
import { addDoc, collection, onSnapshot, Timestamp } from 'firebase/firestore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface CODE {
  _id?: string;
  code: string;
  used: boolean;
  date: Date | Timestamp;
}

const WithdrawalCode = () => {
  const [codes, setCodes] = useState<CODE[] | []>([]);
  let isMounted = useRef(true);

  useEffect(() => {
    const ref = collection(db, 'withdrawalCode');

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

  const generateNewCode = async () => {
    const collectionRef = collection(db, 'withdrawalCode');

    const randomNumber = Math.floor(Math.random() * 999999 + 9999);

    const newCode = {
      code: randomNumber.toString(),
      date: new Date(),
      used: false,
    };

    try {
      toast.loading('Generating new code...');

      await addDoc(collectionRef, newCode);

      toast.dismiss();
      toast.success('Code generated.');
    } catch (error) {
      console.log(error);
      toast.error('Error generating code');
    }
  };

  const sortedCodes = useMemo(() => {
    return codes?.sort((a, b) => {
      return a.used === b.used ? 0 : a.used ? 1 : -1;
    });
  }, [codes]);

  return (
    <div className=' min-h-screen'>
      <div>
        <div className='mt-8 text-gray-700'>
          <p className=' text-2xl font-bold mb-4'>Withdrawal Codes</p>

          <div className='my-4 mb-8'>
            <Button type='button' onClick={generateNewCode}>
              Generate new code
            </Button>
          </div>

          {codes && codes.length > 0 && sortedCodes ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
                  <p className='text-lg font-light my-4'> {code.code} </p>

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
              <p className='text-2xl text-neutral'> No withdrawal codes </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalCode;
