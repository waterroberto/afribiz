import { InvestmentPlan, SignalCode } from '@/interface';
import { HiOutlineUser } from 'react-icons/hi';
import { LuCandlestickChart, LuQrCode } from 'react-icons/lu';
import {
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdDocumentScanner,
  MdOutlineDashboard,
} from 'react-icons/md';
import { TfiSignal } from 'react-icons/tfi';
import { HiWallet } from "react-icons/hi2";


export const user_links = [
  { name: 'dashboard', icon: <MdOutlineDashboard />, page: '/dashboard' },
  {
    name: 'deposit',
    icon: <MdAccountBalance />,
    page: '/dashboard/deposit',
  },
  {
    name: 'withdraw',
    icon: <MdAccountBalanceWallet />,
    page: '/dashboard/withdraw',
  },
  {
    name: 'trading',
    icon: <TfiSignal />,
    page: '/dashboard/trading',
  },

  {
    name: 'account upgrade',
    icon: <MdDocumentScanner />,
    page: '/dashboard/account-upgrade',
  },
  {
    name: 'profile',
    icon: <HiOutlineUser />,
    page: '/dashboard/profile',
  },
];

export const admin_links = [
  { name: 'dashboard', icon: <MdOutlineDashboard />, page: '/admin' },
  { name: 'VAT Codes', icon: <LuQrCode />, page: '/admin/vat-codes' },
  { name: 'Add Wallet Address', icon: <HiWallet  />, page: '/admin/wallets' },
  {
    name: 'signal Trading',
    icon: <LuCandlestickChart />,
    page: '/admin/signal-trading',
  },
];

export const signal_codes: SignalCode[] = [
  {
    status: 'profit',
    percentage: 11,
    min_amount: 1500,
    max_amount: 5000,
    duration: 10,
  },
];

export const investment_plans: InvestmentPlan[] = [
  {
    name: 'basic',
    percentage: 15,
    min_amount: 1000,
    max_amount: 3000,
    duration: 7,
  },
  {
    name: 'standard',
    percentage: 20,
    min_amount: 5000,
    max_amount: 10000,
    duration: 7,
  },
  {
    name: 'premium',
    percentage: 20,
    min_amount: 15000,
    max_amount: 25000,
    duration: 14,
  },
  {
    name: 'ultimate',
    percentage: 40,
    min_amount: 50000,
    max_amount: 100000,
    duration: 28,
  },
];
