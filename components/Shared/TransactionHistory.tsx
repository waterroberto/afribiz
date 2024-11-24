'use client';
import { db } from '@/config/firebase.config';
// import userDataContext from '@/context/UserDataContext';
import UserDataContext from '@/context/UserDataContext';
import { ITransaction, TableHeadersProps, TransactionType } from '@/interface';
import { formatCurrency, formatDate } from '@/utils/utils';
import clsx from 'clsx';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { HiArrowDownLeft, HiArrowUpRight } from 'react-icons/hi2';
import Button from '../Global/Button';
import Modal from '../Global/Modal';
import Table from './Table';

export default function TransactionHistory({
  data,
  processTransaction,
}: {
  data: TransactionType[];
  processTransaction?: (
    type: string,
    status: string,
    id: string,
    amount: number
  ) => void;
}) {
  const { userData } = useContext(UserDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] =
    useState<ITransaction | null>(null);

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setActiveTransaction(null);
  }

  const tableHeaders: TableHeadersProps[] = [
    {
      title: 'Transaction Type',
      field: 'type',
      body: (data: TransactionType) => {
        return (
          <span
            className={clsx(
              'capitalize text-xs py-1 px-4 border-2 rounded-lg inline-flex items-center gap-2 font-semibold',
              data.type === 'deposit' && 'text-green-600 border-green-600',
              data.type === 'withdraw' && 'text-orange-600 border-orange-600'
            )}
          >
            {data.type === 'deposit' && <HiArrowDownLeft />}
            {data.type === 'withdraw' && <HiArrowUpRight />}
            {data.type}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      field: 'amount',
      body: (data: TransactionType) => {
        return (
          <div>
            {data.currency}
            {data.amount.toLocaleString()}
          </div>
        );
      },
    },
    {
      title: 'Status',
      field: 'status',
      body: (data: TransactionType) => {
        return (
          <div
            className={clsx(
              'font-bold uppercase text-xs',
              data.status === 'pending' && 'text-orange-500',
              data.status === 'approved' && 'text-green-500',
              data.status === 'declined' && 'text-red-500'
            )}
          >
            {data.status}
          </div>
        );
      },
    },
    {
      title: 'Date',
      field: 'date',
      body: (data: TransactionType) => {
        return (
          <div className='flex items-center justify-between'>
            <span>
              {moment(data?.date?.seconds * 1000).format('MMM Do YYYY, h:mm a')}
            </span>
            <Button
              size='small'
              variant='outlined'
              color='tertiary'
              rounded
              onClick={() => {
                openModal();
                setActiveTransaction(data);
              }}
            >
              View
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {activeTransaction && modalOpen && (
        <Modal
          isOpen={modalOpen}
          title='transaction details'
          closeButton
          handleClose={closeModal}
        >
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Transaction Type</p>
            <p className='text-neutral'>{activeTransaction.type}</p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Transaction ID</p>
            <p className='text-neutral'>{activeTransaction._id}</p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Amount</p>
            <p className='text-neutral'>
              {activeTransaction?.currency}
              {activeTransaction?.amount.toLocaleString()}
            </p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Transaction Status</p>
            <p className='text-neutral'>{activeTransaction?.status}</p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Date</p>
            <p className='text-neutral'>
              {moment(activeTransaction.date.seconds * 1000).format(
                'MMM Do YYYY, h:mm a'
              )}
            </p>
          </div>

          {userData?.isAdmin && activeTransaction && (
            <div className='px-6 py-4 whitespace-nowrap text-right'>
              {activeTransaction.status !== 'pending' && <p>N/A</p>}
              {activeTransaction.status === 'pending' && (
                <div className='flex items-center gap-4'>
                  <Button
                    color='success'
                    onClick={() => {
                      if (processTransaction) {
                        processTransaction(
                          activeTransaction.type,
                          'approved',
                          activeTransaction?._id,
                          activeTransaction?.amount
                        );
                        closeModal();
                      }
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    color='danger'
                    onClick={() => {
                      if (processTransaction) {
                        processTransaction(
                          activeTransaction.type,
                          'declined',
                          activeTransaction._id,
                          activeTransaction.amount
                        );
                        closeModal();
                      }
                    }}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal>
      )}
      <Table headers={tableHeaders} data={data} />
    </div>
  );
}
