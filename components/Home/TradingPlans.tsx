import React from 'react';
import InvestmentPlans from '../InvestmentPlans';

export default function TradingPlans() {
  return (
    <div className='my-8 padding bg-gray-50'>
      <div className='mx-auto max-w-4xl text-center mb-16 uppercase'>
        <p className='mb-4 text-4xl font-bold text-dark'>Investment Plans</p>
        <p className='font-medium text-gray-700 text-lg'>
          INVEST IN OUR VARIOUS PLANS TO YIELD A PASSIVE INCOME FOR YOUR
          RETIREMENT
        </p>
      </div>
      <InvestmentPlans />
    </div>
  );
}
