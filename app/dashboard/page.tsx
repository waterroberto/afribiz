import AccountBalance from '@/components/Dashboard/AccountBalance';
import WalletBalance from '@/components/Dashboard/WalletBalance';
import TradingViewChart from '@/components/Dashboard/Widgets/TradingViewChart';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import TraderLevel from '@/components/Shared/TraderLevel';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <TradingViewTicker />
      <WalletBalance />
      <TraderLevel />
      <AccountBalance />
      <TradingViewChart />
    </>
  );
}
