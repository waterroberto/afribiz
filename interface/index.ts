import { Timestamp } from 'firebase/firestore';

export interface DISPLAY_WALLET {
  title: string;
  price: string | number;
}

export type CodeDataType = {
  _id?: string;
  code: string;
  tradeTimeInterval: string;
  tradeOutput: string;
  used: boolean;
  percentage: string;
};

export interface KYCDOCUMENT {
  type: string;
  documents: string[];
}

export interface UserDataType {
  [key: string]: any;
  _id: string;
  fullname: string;
  username: string;
  phone: string;
  password: string;
  country: string;
  email: string;
  gender: string;
  avatar_url: string;
  kyc_document: KYCDOCUMENT;
  kyc_submitted: boolean;
  kyc_approved: boolean;
  kyc_pending: boolean;
  account_level: number;
  account_number: string;
  account_name: string;
  bank_name: string;
  swift_code: string;
  bitcoin_address: string;
  ethereum_address: string;
  cashapp_tag: string;
  paypal_email: string;
  deposits: IDeposit[];
  withdrawals: IWITHDRAWAL[];
  isAdmin: boolean;
  isVerified: boolean;
  timestamp: Timestamp;
  currency: string;
  isBlocked: boolean;
  wallet: Wallet;
  symbol: string;
  nextOfKin: NextOfKin;
  plans: IPackage[];
  tradingPercentage: number;
}

export interface ITransaction {
  _id: string;
  status: string;
  amount: number;
  date: Timestamp;
  type: string;
  currency: string;
}

export type IDeposit = ITransaction & {
  // [key: string]: string | number | undefined | Timestamp
  amount: number;
  asset: string;
  proofOfPayment?: string;
  _id?: string;
  userId: string;
  date: Timestamp;
  status: string;
  type: string;
};

export type IWITHDRAWAL = ITransaction & {
  // [key: string]: any;
  _id?: string;
  amount: number;
  status: string;
  type: string;
  paymentMethod: string;
  date: Timestamp;
  userId: string;
  asset: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  email?: string;
  binanceId?: string;
  currency: string;
};

export type TransactionType = IWITHDRAWAL | IDeposit;

export interface TableHeadersProps {
  title: string;
  field: string;
  body: (body: any) => React.JSX.Element;
}

export interface IPackage {
  name: string;
  min: number;
  max: number;
  price: number;
  interest: number;
  commission: number;
  bonus: number;
}
export interface Manager {
  id: string;
  name: string;
}

export interface Wallet {
  [key: string]: number;
  bonus: number;
  deposit: number;
  investment: number;
  profit: number;
  referral: number;
  withdraw: number;
}

interface NextOfKin {
  email: string;
  gender: string;
  relationship: string;
  phoneNumber: string;
  name: string;
}

export type TableProps = {
  data: any[];
  headers: TableHeadersProps[];
  selectable?: boolean;
  stripedRows?: boolean;
  showGridlines?: boolean;
  sortMode?: 'single' | 'multiple';
  scrollable?: boolean;
  loading?: boolean;
  desktopOnly?: boolean;
  dataKey?: string;
  children?: React.ReactNode;
  selectionMode?: 'multiple' | 'single';
  scrollHeight?: string;
  onRowSelect?: () => void;
  onRowUnselect?: () => void;
  selectedData?: any[] | null;
  onSelectionChange?: (e: any) => void;
};

export interface SignalCode {
  status: 'profit' | 'loss';
  percentage: number;
  min_amount: number;
  max_amount: number;
  duration: number;
}

export interface InvestmentPlan {
  name: string;
  percentage: number;
  min_amount: number;
  max_amount: number;
  duration: number;
}

export interface InvestmentType {
  _id?: string;
  type: 'investment';
  name: string;
  percentage: number;
  amount: number;
  duration: number;
  date: Timestamp;
  status: 'ongoing' | 'completed';
}
