'use client';
import { InvestmentType, TableHeadersProps } from '@/interface';
import { formatCurrency, formatDate } from '@/utils/utils';
import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../Global/Button';
import Modal from '../Global/Modal';
import Table from './Table';

export default function TradingHistory({ data }: { data: InvestmentType[] }) {
  // const { userData } = useContext(userDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] =
    useState<InvestmentType | null>(null);

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setActiveTransaction(null);
  }

  const tableHeaders: TableHeadersProps[] = [
    {
      title: 'Plan',
      field: 'type',
      body: (data: InvestmentType) => {
        return (
          <span
            className={clsx(
              'capitalize text-xs py-1 px-4 border border-primary rounded-lg inline-flex items-center gap-2 font-semibold'
            )}
          >
            {data.name}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      field: 'amount',
      body: (data: InvestmentType) => {
        return <div>${data.amount.toLocaleString()}</div>;
      },
    },
    {
      title: 'Status',
      field: 'status',
      body: (data: InvestmentType) => {
        return (
          <div
            className={clsx(
              'font-bold uppercase text-xs',
              data.status === 'ongoing' && 'text-orange-600',
              data.status === 'completed' && 'text-green-600'
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
      body: (data: InvestmentType) => {
        return (
          <div className='flex items-center justify-between'>
            <span>
              {moment(data?.date?.seconds * 1000).format('MMM Do YYYY, h:mm a')}
            </span>
            <Button
              size='small'
              variant='outlined'
              color='dark'
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
          title='investment details'
          closeButton
          handleClose={closeModal}
        >
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Transaction Type</p>
            <p className='text-gray-800 capitalize'>{activeTransaction.type}</p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Transaction ID</p>
            <p className='text-gray-800'>{activeTransaction._id}</p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Amount</p>
            <p className='text-gray-800'>
              ${activeTransaction?.amount.toLocaleString()}
            </p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Trading Status</p>
            <p
              className={clsx(
                'font-bold uppercase text-xs',
                activeTransaction.status === 'ongoing' && 'text-orange-600',
                activeTransaction.status === 'completed' && 'text-green-600'
              )}
            >
              {activeTransaction.status}
            </p>
          </div>
          <div className='flex justify-between py-4 border-b border-b-gray-200 text-sm'>
            <p className='text-gray-700'>Date</p>
            <p className='text-gray-800 font-light'>
              {moment(activeTransaction.date.seconds * 1000).format(
                'MMM Do YYYY, h:mm a'
              )}
            </p>
          </div>
        </Modal>
      )}
      <Table headers={tableHeaders} data={data} />
    </div>
  );
}
