import { investment_plans } from '@/static';
import Link from 'next/link';
import React from 'react';
import Button from './Global/Button';

export default function InvestmentPlans({
  authenticated = false,
}: {
  authenticated?: boolean;
}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {investment_plans.map((investment) => (
        <div
          key={investment.name}
          className='p-6 rounded-xl bg-primary border border-blue-100 text-gray-600'
          data-aos='fade-up'
        >
          <p className='font-semibold capitalize text-xl mb-8'>
            {investment.name}
          </p>

          <div className='grid grid-cols-2 gap-4 my-4'>
            <div>
              <p className='text-xs'>Min</p>
              <p className='text-xl font-bold text-neutral'>
                ${investment.min_amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className='text-xs'>Max</p>
              <p className='text-xl font-bold text-neutral'>
                ${investment.max_amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Duration:</span>
            <span>
              <span className='text-neutral'>{investment.duration} </span>
              days
            </span>
          </div>
          <div className='flex items-center gap-8 justify-between text-sm my-4 font-medium'>
            <span>Profit Percentage:</span>
            <span>
              <span className='text-neutral'>{investment.percentage}%</span>
            </span>
          </div>

          {authenticated ? (
            <Button block>Purchase</Button>
          ) : (
            <Link href='/auth/register'>
              <Button block>Get Started</Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
