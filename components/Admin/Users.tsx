'use client';
import useGetAllUsers from '@/hooks/useGetAllUsers';
import React from 'react';
import UsersTable from './UsersTable';

export default function Users() {
  const { first, isLoading, onPageChange, rows, users } = useGetAllUsers();

  return (
    <div className='mt-8'>
      <UsersTable
        users={users}
        isLoading={isLoading}
        first={first}
        onPageChange={onPageChange}
        rows={rows}
      />
    </div>
  );
}
