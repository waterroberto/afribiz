import { db, storage } from '@/config/firebase.config';
import { CodeDataType, IDeposit, IWITHDRAWAL, UserDataType } from '@/interface';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export const AdminService = {
  fetchAllUsers: async function () {
    const q = query(collection(db, 'users'), where('isAdmin', '==', false));

    const __users: UserDataType[] = [];

    const userSnapshot = await getDocs(q);
    userSnapshot.forEach((doc) => {
      __users.push(doc.data() as UserDataType);
    });

    return __users;
  },
  fetchAllWithdrawals: async function () {
    const q = query(
      collection(db, 'withdrawalRequests'),
      where('status', '==', 'pending')
    );

    const __withdrawals: IWITHDRAWAL[] = [];

    const userSnapshot = await getDocs(q);
    userSnapshot.forEach((doc) => {
      __withdrawals.push(doc.data() as IWITHDRAWAL);
    });

    return __withdrawals;
  },
  fetchAllDeposits: async function () {
    const q = query(
      collection(db, 'depositRequests'),
      where('status', '==', 'pending')
    );

    const __deposits: IDeposit[] = [];

    const userSnapshot = await getDocs(q);
    userSnapshot.forEach((doc) => {
      __deposits.push(doc.data() as IDeposit);
    });

    return __deposits;
  },

  fetchAllCodes: async function () {
    const q = query(
      collection(db, 'codes')
    );

    const _codes: CodeDataType[] = []

    const codesSnapShot = await getDocs(q)
    codesSnapShot.forEach((doc) => {
      _codes.push(doc.data() as CodeDataType)
    })

    return _codes

  }
};
