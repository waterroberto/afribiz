'use client';
import Button from '@/components/Global/Button';
import { UserDataType } from '@/interface';
import moment from 'moment';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Loader from '../Global/Loader';
import TextInput from '../Global/TextInput';

export default function UsersTable({
  users,
  onPageChange,
  rows,
  first,
  isLoading,
}: {
  users: UserDataType[] | null;
  onPageChange: (event: {
    first: React.SetStateAction<number>;
    rows: React.SetStateAction<number>;
  }) => void;
  rows: number;
  first: number;
  isLoading: boolean;
}) {
  const [searchValue, setSearchValue] = useState('');

  const dateTemplate = (user: UserDataType) => {
    const { timestamp } = user;

    if ('seconds' in timestamp) {
      return moment(timestamp.seconds * 1000).format('MMM Do YYYY, h:mm a');
    }
  };

  function capitalBalanceTemplate(user: UserDataType) {
    return `${user.currency} ${user.wallet.deposit.toLocaleString()}`;
  }

  function profitBalanceTemplate(user: UserDataType) {
    return `${user.currency} ${user.wallet.profit.toLocaleString()}`;
  }

  function bonusBalanceTemplate(user: UserDataType) {
    return `${user.currency} ${user.wallet.bonus.toLocaleString()}`;
  }

  function actionTemplate(user: UserDataType) {
    return (
      <Link
        className='flex items-center gap-4'
        href={`/admin/users/${user._id}`}
      >
        <Button variant='outlined' size='small'>
          View
        </Button>
      </Link>
    );
  }

  function fullNameTemplate(user: UserDataType) {
    return <span className='capitalize'>{user.fullname}</span>;
  }

  function statusTemplate(user: UserDataType) {
    const { blocked } = user;

    let styles = '';

    if (blocked) styles = 'bg-red-100 text-red-600';
    else styles = 'bg-green-100 text-green-600';

    return (
      <span
        className={`p-2 px-4 text-xs font-semibold rounded-full capitalize ${styles}`}
      >
        {blocked ? 'Blocked' : 'Active'}
      </span>
    );
  }

  const filteredUsers = useMemo(() => {
    const searchString = searchValue.toLowerCase();

    if (users)
      return users?.filter(
        (user: UserDataType) =>
          user.fullname.toLowerCase().includes(searchString) ||
          user.email.toLowerCase().includes(searchString) ||
          user._id?.toLowerCase().includes(searchString)
      );
  }, [users, searchValue]);

  return (
    <div className='card rounded-xl p-4 bg-white'>
      <div className='mb-8 p-4'>
        <p className='font-bold text-xl text-gray-700 mb-4'>All Users</p>
        <TextInput
          required
          leftIcon={<CiSearch />}
          placeholder='Search...(Email, First Name, Last Name, User ID)'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {isLoading && (
        <div
          className={`mx-2 rounded-none w-full absolute left-0 top-0 bottom-0 right-0 h-full bg-white/10 backdrop-blur-[2px] z-10 flex items-center justify-center`}
        >
          <Loader />
        </div>
      )}
      <DataTable
        value={filteredUsers ?? []}
        dataKey='_id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        first={first}
        rows={rows}
        rowsPerPageOptions={[5, 10, 20]}
        className='text-gray-800 rounded-md text-sm p-datatable p-component p-datatable-responsive-scroll'
        sortOrder={-1}
        sortField='timestamp'
        onPage={onPageChange}
      >
        <Column
          field='fullName'
          header='Full Name'
          body={fullNameTemplate}
          sortable
        ></Column>
        <Column field='email' header='Email' sortable></Column>
        <Column
          field='wallet.capital'
          header='Capital'
          body={capitalBalanceTemplate}
        ></Column>
        <Column
          field='wallet.profit'
          header='Profit'
          body={profitBalanceTemplate}
        ></Column>
        <Column
          field='wallet.bonus'
          header='Bonus'
          body={bonusBalanceTemplate}
        ></Column>
        <Column field='date' header='Date Joined' body={dateTemplate}></Column>
        <Column
          field='isBlocked'
          header='Status'
          body={statusTemplate}
        ></Column>
        <Column field='action' header='Action' body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
