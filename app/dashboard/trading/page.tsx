'use client';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import InvestmentPlans from '@/components/InvestmentPlans';
import TraderLevel from '@/components/Shared/TraderLevel';
import TradingHistory from '@/components/Shared/TradingHistory';
import UserDataContext from '@/context/UserDataContext';
import { InvestmentType } from '@/interface';
import { investment_plans } from '@/static';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import React, { useContext } from 'react';
import { TbChartCandle } from 'react-icons/tb';
import CapitalAndProfit from './components/CapitalAndProfit';

const investments: InvestmentType[] = [
  // {
  //   _id: '1',
  //   type: 'investment',
  //   name: 'basic',
  //   percentage: 20,
  //   amount: 2500,
  //   duration: 7,
  //   date: Timestamp.now(),
  //   status: 'ongoing',
  // },
  // {
  //   _id: '1',
  //   type: 'investment',
  //   name: 'standard',
  //   percentage: 20,
  //   amount: 5000,
  //   duration: 7,
  //   date: Timestamp.now(),
  //   status: 'completed',
  // },
];

export default function TradingPage() {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      <TradingViewTicker />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <TraderLevel />
          <div className='my-8 flex flex-col items-center justify-center gap-2 text-gray-700'>
            <span className='text-sm font-medium'>Investment Return</span>
            <p className='text-3xl font-bold'>
              {userData?.currency}
              {userData?.wallet.investment.toLocaleString()}
            </p>
          </div>

          <CapitalAndProfit />
        </Card>
        <div className=''>
          <Link href='/dashboard/trading/signal'>
            <Card>
              <div className='flex items-center flex-col justify-center gap-2'>
                <TbChartCandle className='text-5xl text-primary' />
                <p className='text-xl'>Signal Trading</p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
      <div className='my-8'>
        <p className='mb-4 text-xl font-semibold text-gray-700'>
          Investment Plans
        </p>

        <InvestmentPlans authenticated={true} />
      </div>
      {/* Investment History */}
      <Card>
        <p className='mb-4 text-xl font-semibold text-gray-700'>
          My Investments
        </p>
        <TradingHistory data={investments} />
      </Card>
    </>
  );
}
