import { db, storage } from '@/config/firebase.config';
import { IDeposit, IWITHDRAWAL } from '@/interface';
import generateUniqueCode from '@/utils/generateCode';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';

export const UserService = {
  getUrlFromFileUpload: async function (
    _fileRef: string,
    userId: string,
    randomId: string,
    file: File
  ) {
    const fileRef = ref(
      storage,
      `${_fileRef}/${userId}_${randomId}_${new Date().getTime()}`
    );

    const snapshot = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(snapshot.ref);

    return fileUrl;
  },
  uploadUserAvatar: async function (
    userId: string,
    randomId: string,
    file: any
  ) {
    const url = await this.getUrlFromFileUpload(
      'depositProof',
      userId,
      randomId,
      file
    );

    return url;
  },

  sendDepositRequest: async function (user: string, data: IDeposit) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);

    const deposits = res?.data()?.deposits;
    let imageId = generateUniqueCode(7);

    data.date = Timestamp.now();

    const url = await this.uploadUserAvatar(user, imageId, data.proofOfPayment);

    console.log(url);

    const _ = await addDoc(collection(db, 'depositRequests'), {
      ...data,
      proofOfPayment: url,
    });

    await updateDoc(userRef, {
      deposits: [
        ...deposits,
        {
          ...data,
          _id: _.id,
          proofOfPayment: url,
        },
      ],
    });

    return { message: 'Successful', ok: true, id: data?._id, url };
  },

  sendWithdrawalRequest: async function (user: string, data: IWITHDRAWAL) {
    const userRef = doc(db, 'users', user);
    const res = await getDoc(userRef);

    const withdrawals = res?.data()?.withdrawals;

    getDoc(userRef).then(async (snap) => {
      const body = snap.data();
      if (!body) return toast.error('user not found');

      const _ = await addDoc(collection(db, 'withdrawalRequests'), {
        ...data,
      });

      await updateDoc(userRef, {
        withdrawals: [
          ...withdrawals,
          {
            ...data,
            _id: _.id,
          },
        ],
      });
    });
    return { message: 'Successful', ok: true, id: data?._id };
  },
};
