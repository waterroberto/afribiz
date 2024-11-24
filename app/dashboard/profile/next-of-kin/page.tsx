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

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
  relationship: Yup.string().required(),
  gender: Yup.string().required(),
});

function NextOfKin() {
  const router = useRouter();
  const { userData } = useContext(UserDataContext);
  const [editState, setEditState] = useState(false);
  const [userDataCopy, setUserDataCopy] = useState<UserDataType | null>(null);

  const formik = useFormik({
    initialValues: {
      name: userData?.nextOfKin.name,
      relationship: userData?.nextOfKin.relationship,
      gender: userData?.nextOfKin.gender,
      email: userData?.nextOfKin.email,
      phoneNumber: userData?.nextOfKin.phoneNumber,
    },
    validationSchema: schema,
    async onSubmit(values) {
      console.log(values);
      const ref = doc(db, 'users', userData?._id ?? '');

      const fieldValuesUnchanged =
        values.name === userData?.nextOfKin.name &&
        values.email === userData?.nextOfKin.email &&
        values.phoneNumber === userData?.nextOfKin.phoneNumber &&
        values.relationship === userData?.nextOfKin.relationship &&
        values.gender === userData?.nextOfKin.gender;

      if (!fieldValuesUnchanged) {
        toast.loading('Updating profile...');

        await updateDoc(ref, {
          nextOfKin: { ...values },
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

  const {
    values: { email, gender, name, phoneNumber, relationship },
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <Card>
      <div className=' max-w-full'>
        <div className='flex items-center gap-4 p-3'>
          <Link href={``} onClick={() => router.back()} className=''>
            <FiArrowLeft fontSize={30} className='text-neutral' />
          </Link>
          <div className=' flex flex-col items-start gap-1 text-white'>
            <h3 className=' text-lg font-bold-extra'>Next Of Kin</h3>
            <p className=' text-xs capitalize text-white'>
              We will pass your investment to your next of kin incase life
              happens
            </p>
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className=' p-3 flex flex-col gap-5'>
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='fullname'>Full Name</label>
            <TextInput
              name='name'
              id='fullname'
              value={name}
              onChange={handleChange}
              disabled={!editState}
              error={formik.errors.name as string}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='email'>Email</label>
            <TextInput
              name='email'
              id='email'
              value={email}
              onChange={handleChange}
              disabled={!editState}
              error={formik.errors.email as string}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className=" text-neutral" htmlFor='phone'>Phone Number</label>
            <TextInput
              name='phoneNumber'
              id='phone'
              value={phoneNumber}
              onChange={handleChange}
              disabled={!editState}
              error={formik.errors.phoneNumber as string}
            />
          </div>
          <div className=' my-6'>
            <h3 className=' text-lg font-bold-extra my-6 text-white'>Other Details</h3>
            <div className='flex flex-col gap-3'>
              <label className=" text-neutral" htmlFor='relationship'>Relationship</label>
              <TextInput
                name='relationship'
                id='relationship'
                value={relationship}
                onChange={handleChange}
                disabled={!editState}
                error={formik.errors.relationship as string}
              />
            </div>
            <div className='flex flex-col gap-3 my-4'>
              <label className=" text-neutral" htmlFor='email'>Gender</label>
              <TextInput
                name='gender'
                id='gender'
                value={gender}
                onChange={handleChange}
                disabled={!editState}
                error={formik.errors.gender as string}
              />
            </div>
          </div>

          {editState && (
            <Button color="primary" block type='submit'>
              Submit
            </Button>
          )}
          {/*  */}

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

export default NextOfKin;
