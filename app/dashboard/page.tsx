import AccountBalance from '@/components/Dashboard/AccountBalance';
import WalletBalance from '@/components/Dashboard/WalletBalance';
import TradingViewChart from '@/components/Dashboard/Widgets/TradingViewChart';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import TradingSingleTicker from '@/components/Dashboard/Widgets/TradingSingleTicker';
import TraderLevel from '@/components/Shared/TraderLevel';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <TradingViewTicker />
      <WalletBalance />
      <div className="flex flex-col sm:flex-row items-center w-full gap-3 p-2">
        <TraderLevel />
        <TradingSingleTicker/>
      </div>
      <AccountBalance />
      <TradingViewChart />
    </>
  );
}
