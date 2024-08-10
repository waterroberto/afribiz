import { AiFillPieChart } from 'react-icons/ai';
import {
  BiCopy,
  BiSolidBarChartSquare,
  BiSolidCreditCard,
  BiSolidDashboard,
} from 'react-icons/bi';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { HiOutlineUser } from 'react-icons/hi';
import { HiShieldCheck } from 'react-icons/hi2';
import { IoDocumentAttachSharp } from 'react-icons/io5';
import { MdCopyAll } from 'react-icons/md';

export const links = [
  { name: 'dashboard', page: '/dashboard', icon: <BiSolidDashboard /> },
  {
    name: 'market',
    page: '/dashboard/market',
    icon: <BiSolidBarChartSquare />,
  },
  {
    name: 'Copy Trading',
    page: '/dashboard/copyTrading',
    icon: <AiFillPieChart />,
  },
  {
    name: 'deposit',
    page: '/dashboard/deposit',
    icon: <BiSolidCreditCard />,
  },
  {
    name: 'withdrawal',
    page: '/dashboard/withdraw',
    icon: <FaMoneyBillTransfer />,
  },
  {
    name: 'funds transfer',
    page: '/dashboard/transfer',
    icon: <FaMoneyBillTransfer />,
  },
  {
    name: 'history',
    page: '/dashboard/history',
    icon: <FaHistory />,
  },
  {
    name: 'packages',
    page: '/dashboard/packages',
    icon: <HiShieldCheck />,
  },

  {
    name: 'AML/KYC',
    page: '/dashboard/kyc',
    icon: <IoDocumentAttachSharp />,
  },
  {
    name: 'profile',
    page: '/dashboard/profile',
    icon: <HiOutlineUser />,
  },
];

export const admin_links = [
  { name: 'home', page: '/admin', icon: <BiSolidDashboard /> },
  // { name: 'users', page: '/admin/users', icon: <FaUsers /> },
  { name: 'wallets', page: '/admin/wallets', icon: <FaMoneyBillTransfer /> },
  { name: 'Investment Code', page: '/admin/code', icon: <MdCopyAll /> },
  {
    name: 'Withdrawal Code',
    page: '/admin/withdrawal-code',
    icon: <BiCopy />,
  },
  // {
  //   name: 'withdrawal requests',
  //   page: '/admin/withdrawals',
  //   icon: <FaMoneyBillTransfer />,
  // },
  // {
  //   name: 'live trades',
  //   page: '/admin/trades',
  //   icon: <AiFillPieChart />,
  // },
  // {
  //   name: 'kyc uploads',
  //   page: '/admin/kyc',
  //   icon: <HiIdentification />,
  // },
];
