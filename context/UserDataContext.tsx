import { auth, db } from '@/config/firebase.config';
import { UserDataType } from '@/interface';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

const initialState = {
  userData: {
    isAdmin: false,
    isVerified: false,
    _id: '',
    fullname: '',
    username: '',
    phone: '',
    country: '',
    email: '',
    gender: '',
    accumulating_balance: 0,
    capital: 0,
    bonus: 0,
    profit: 0,
    avatar_url: '',
    kyc_document: { type: '', documents: [] },
    kyc_submitted: false,
    kyc_approved: false,
    kyc_pending: false,
    account_level: 1,
    account_number: '',
    account_name: '',
    bank_name: '',
    swift_code: '',
    bitcoin_address: '',
    ethereum_address: '',
    cashapp_tag: '',
    paypal_email: '',
    deposits: [],
    withdrawals: [],
    timestamp: Timestamp.now(),
    currency: '',
    isBlocked: false,
    password: '',
    wallet: {
      bonus: 0,
      deposit: 0,
      investment: 0,
      profit: 0,
      referral: 0,
      withdraw: 0,
    },
    symbol: '',
    nextOfKin: {
      email: '',
      gender: '',
      relationship: '',
      phoneNumber: '',
      name: '',
    },
    plans: [],
    tradingPercentage: 0,
  },
  fetchingData: true,
};

interface UserDataContextType {
  userData: UserDataType | null;
  fetchingData: boolean;
}

const UserDataContext = createContext<UserDataContextType>(initialState);

export function UserDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
              setUserData(snap.data() as UserDataType);
            }
            setFetchingData(false);
          });
        }
      });
    };

    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, fetchingData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContext;
