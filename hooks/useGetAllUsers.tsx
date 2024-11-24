'use client';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { UserDataType } from '@/interface';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';

export default function useGetAllUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserDataType[] | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const { userData } = useContext(UserDataContext);

  const onPageChange = (event: {
    first: React.SetStateAction<number>;
    rows: React.SetStateAction<number>;
  }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    const qry = query(
      collection(db, 'users'),
      // where('isAdmin', '==', false),
      orderBy('timestamp'),
      startAt(first)
    );

    const usersUnsub = onSnapshot(qry, (snap) => {
      if (!snap.empty) {
        console.log(snap.docs.forEach((user) => user.data()));

        const newUsers = snap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as UserDataType)
        );

        setUsers([]);
        setUsers(newUsers);
      }
    });

    setIsLoading(false);

    return () => {
      usersUnsub();
    };
  }, [userData?._id, userData?.isAdmin, first]);

  return { isLoading, users, rows, first, onPageChange };
}
