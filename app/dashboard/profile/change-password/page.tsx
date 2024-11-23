'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import TextInput from '@/components/Global/TextInput';
import { auth } from '@/config/firebase.config';
import admin from 'firebase-admin';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiShowAlt, BiSolidHide } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

function ChangePassword() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string().min(6).required(),
      confirmPassword: Yup.string().min(6).required(),
    }),
    onSubmit(values) {
      console.log(values);
      handleChangePassword(values);
    },
  });

  const handleChangePassword = (data: any) => {
    // signInWithEmailAndPassword(
    //       auth,
    //       user.email,
    //       data.oldPassword
    // ).then((credential) => {
    //   user.
    // })
  };

  const { handleChange, handleSubmit, values } = formik;
  return (
    <Card>
      <div className='flex items-center gap-4 p-3'>
        <Link href={``} onClick={() => router.back()} className=''>
          <FiArrowLeft fontSize={30} className='text-neutral' />
        </Link>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='text-lg font-bold-extra'>Security</h3>
          <p className='text-xs capitalize text-gray-600'>
            change your password{' '}
          </p>
        </div>
      </div>
      {/* form */}
      <form onSubmit={handleSubmit} className=' p-3 flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <label htmlFor='oldPassword'>Old Password</label>
          <TextInput
            type={oldPassword ? 'text' : 'password'}
            name='oldPassword'
            id='oldPassword'
            rightIcon={oldPassword ? <BiShowAlt /> : <BiSolidHide />}
            rightIconClick={() => setOldPassword(!oldPassword)}
            value={values.oldPassword}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <label htmlFor='newPassword'>New Password</label>
          <TextInput
            type={newPassword ? 'text' : 'password'}
            name='newPassword'
            id='newPassword'
            rightIcon={newPassword ? <BiShowAlt /> : <BiSolidHide />}
            rightIconClick={() => setNewPassword(!newPassword)}
            value={values.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <TextInput
            type={confirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            id='confirmPassword'
            rightIcon={confirmPassword ? <BiShowAlt /> : <BiSolidHide />}
            rightIconClick={() => setConfirmPassword(!confirmPassword)}
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button block type='submit'>
          Change Password
        </Button>
      </form>
    </Card>
  );
}

export default ChangePassword;
