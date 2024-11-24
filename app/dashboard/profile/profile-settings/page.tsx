'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import TextInput from '@/components/Global/TextInput';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { UserDataType } from '@/interface';
import { doc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

function Profile() {
  const router = useRouter();
  const { userData } = useContext(UserDataContext);
  const [editState, setEditState] = useState(false);
  const [userDataCopy, setUserDataCopy] = useState<UserDataType | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: userData!?.fullname,
      email: userData!?.email,
      phone: userData!?.phone,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
    }),
    async onSubmit(values) {
      console.log(values);

      const ref = doc(db, 'users', userData?._id ?? '');

      const fieldValuesUnchanged =
        values.fullname === userData?.fullname &&
        values.email === userData?.email &&
        values.phone === userData?.phone;

      if (!fieldValuesUnchanged) {
        toast.loading('Updating profile...');

        await updateDoc(ref, {
          ...values,
          lastUpdated: new Date(),
        }).finally(() => {
          setEditState(false);

          toast.dismiss();
          toast.success('Successfully Updated');
        });
      }
    },
  });

  useEffect(() => {
    if (userData) {
      setUserDataCopy(userData);
    }
  }, [userData]);

  return (
    <Card>
      <div className=' max-w-full'>
        <div className='flex items-center gap-4 p-3'>
          <Link href={``} onClick={() => router.back()} className=''>
            <FiArrowLeft fontSize={30} className='text-neutral' />
          </Link>
          <div className='flex flex-col items-start gap-1'>
            <p className=' text-lg font-bold-extra text-white'>Profile Setting</p>
            <p className=' text-xs capitalize text-white'>
              Edit your profile details
            </p>
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className=' p-3 flex flex-col gap-5'
        >
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='fullname'>Full Name</label>
            <TextInput
              name='fullname'
              id='fullname'
              value={formik.values.fullname}
              onChange={formik.handleChange}
              disabled={!editState}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='email'>Email</label>
            <TextInput
              name='email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={true}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='phone'>Phone Number</label>
            <TextInput
              name='phone'
              id='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              disabled={!editState}
            />
          </div>
          {editState && (
            <Button color="primary" block type='submit'>
              Submit
            </Button>
          )}
          <Button
            block
            type='button'
            color={editState ? 'secondary' : 'primary_2'}
            onClick={() => {
              if (editState) {
                setEditState(false);
                formik.resetForm();
              } else setEditState(true);
            }}
          >
            {editState ? 'Cancel' : 'Update Profile'}
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default Profile;
