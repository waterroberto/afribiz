'use client';
import { CODE } from '@/app/admin/signal-trading/page';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Loader from '@/components/Global/Loader';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type BalanceType = 'deposit' | 'profit';

export default function TradingForm() {
  const router = useRouter();
  const { userData } = useContext(UserDataContext);
  const [codeData, setCodeData] = useState<CODE | null>(null);
  const [asset, setAsset] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [balanceType, setBalanceType] = useState<BalanceType>('deposit');
  const [isLoading, setIsLoading] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const csmTrade = localStorage.getItem('csm-trade');
      const csmTradeStatus = localStorage.getItem('csm-trade-status');

      const csmTradeData = JSON.parse(csmTrade as any);
      const csmTradeStatusData = JSON.parse(csmTradeStatus as any);

      if (csmTradeData && csmTradeStatusData) {
        setIsTrading(true);
        setCodeVerified(true);
        setCodeData(csmTradeData as CODE);
      }
    }
  }, []);

  useEffect(() => {
    const tradingInterval = setInterval(() => {
      if (
        userData &&
        codeData &&
        codeData.timer >= 1000 &&
        isTrading &&
        codeVerified
      ) {
        localStorage.setItem(
          'csm-trade',
          JSON.stringify({
            ...codeData,
            timer: codeData.timer - 1000,
          })
        );

        setCodeData(
          (prev) =>
            ({
              ...prev,
              timer: codeData.timer - 1000,
            } as CODE)
        );

        if (codeData.timer === 1000) {
          updateUserBalance(codeData.type);

          setCodeData(null);
          setIsTrading(false);
          setCodeVerified(false);

          localStorage.clear();
        }
      }
    }, 1000);

    return () => {
      clearInterval(tradingInterval);
    };
  }, [codeData, codeVerified, isTrading, userData]);

  const verifyCodeInput = async () => {
    if (codeInput.trim().length >= 6) {
      try {
        setIsLoading(true);

        const q = query(
          collection(db, 'signalTrading'),
          where('code', '==', codeInput)
        );

        const apiRes = await getDocs(q);
        const res = apiRes.docs;

        if (res) {
          const data = res[0].data();
          setCodeData({
            ...data,
            _id: res[0].id,
          } as CODE);

          setCodeVerified(true);
        } else {
          toast.error('Invalid Signal Code');
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);

        setIsLoading(false);

        toast.error('Invalid Signal Code');
      }
    } else toast.error('Invalid code');
  };

  const initiateTrading = () => {
    if (codeVerified && amount > 0 && codeData) {
      localStorage.setItem(
        'csm-trade',
        JSON.stringify({
          ...codeData,
          potential_profit: amount * (codeData.percent / 100) + amount,
        })
      );

      localStorage.setItem(
        'csm-trade-status',
        JSON.stringify({ status: true })
      );

      setIsTrading(true);
    }
  };

  const updateUserBalance = async (type: 'win' | 'loss') => {
    if (userData && codeData) {
      toast.loading('Initiating transaction...');

      try {
        const ref = doc(db, 'users', userData?._id);
        const q = query(
          collection(db, 'signalTrading'),
          where('code', '==', codeInput)
        );

        await updateDoc(ref, {
          wallet: {
            ...userData.wallet,
            [balanceType]:
              type == 'win'
                ? userData.wallet[balanceType] +
                  (codeData.percent / 100) * amount
                : userData.wallet[balanceType] -
                  (codeData.percent / 100) * amount,
          },
        });

        await getDocs(q).then((snapshot) => {
          if (snapshot.docs.length > 0) {
            snapshot.forEach((snap) => {
              deleteDoc(doc(db, 'signalTrading', snap.id));
            });
          }
        });

        toast.dismiss();
        toast.success('Trading Completed');
      } catch (error) {
        toast.error('Error! Cannot complete transaction');
      }
    }
  };

  return (
    <Card>
      {!isTrading && (
        <form className='p-2'>
          <div className='mb-6'>
            <label htmlFor='asset' className='block text-sm text-gray-600 mb-2'>
              Asset*
            </label>
            <select
              id='asset'
              required
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              <option value='BTCUSD'>BTCUSD</option>
              <option value='EURUSD'>EURUSD</option>
              <option value='GBPUSD'>GBPUSD</option>
              <option value='USDJPY'>USDJPY</option>
            </select>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='balanceType'
              className='block text-sm text-gray-600 mb-2 capitalize'
            >
              Trade From *
            </label>
            <select
              id='balanceType'
              required
              value={balanceType}
              onChange={(e) => setBalanceType(e.target.value as BalanceType)}
            >
              <option value='deposit'>Capital</option>
              <option value='profit'>Profit</option>
            </select>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='amount'
              className='block text-sm text-gray-600 mb-2'
            >
              Trade Amount*
            </label>

            <TextInput
              type='number'
              id='amount'
              placeholder='Amount to trade'
              onChange={(e) => setAmount(+e.target.value)}
              error={amount <= 0 ? 'Amount must be greater than 0.00' : ''}
            />
          </div>
          <div className='my-4 grid grid-cols-2 gap-8'>
            {codeVerified && codeData && amount > 0 && (
              <div className='text-sm text-gray-600'>
                <p className='mb-2 font-medium'>Potential Profit</p>
                <p className='text-2xl font-semibold'>
                  {userData?.currency}{' '}
                  {(amount * (codeData.percent / 100)).toLocaleString()}
                </p>
              </div>
            )}

            <div className='flex items-center gap-2 w-full'>
              <TextInput
                id='inputCode'
                placeholder='Input Code'
                onChange={(e) => setCodeInput(e.target.value)}
                className='w-full'
              />
              {codeInput.trim().length >= 6 && amount > 0 && (
                <Button
                  color='dark'
                  onClick={verifyCodeInput}
                  type='button'
                  loading={isLoading}
                >
                  Verify
                </Button>
              )}
            </div>
          </div>

          {codeVerified && codeData && amount > 0 && (
            <div className='mt-8'>
              <Button
                color='success'
                block
                type='button'
                onClick={() => {
                  if (userData && amount <= userData?.wallet[balanceType]) {
                    initiateTrading();
                  } else toast.error('Insufficient funds in selected wallet');
                }}
              >
                TRADE
              </Button>
            </div>
          )}
        </form>
      )}

      {isTrading && codeData && (
        <div>
          <div className='p-8 flex flex-col items-center justify-center gap-8 font-semibold'>
            <Loader />
            <p className='text-5xl text-gray-600'>{codeData.timer / 1000}s</p>
            <p className='text-xl text-gray-600 font-medium'>
              Running Trade...
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
