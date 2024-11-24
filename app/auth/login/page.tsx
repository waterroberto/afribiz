'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import { auth, db } from '@/config/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import * as Yup from 'yup';


const schema = Yup.object({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Password'),
});

const LoginPage = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log(res);
        if (res.user) {
          const ref = doc(db, 'users', res.user.uid);

          const apiRes = await getDoc(ref);
          const data = apiRes.data();

          if (data) {
            toast.success('Welcome to Afribiz Trade Investment');
            if (data.isAdmin) {
              router.replace('/admin');
            } else {
              router.replace('/dashboard');
            }
          }
        }
      } catch (error) {
        toast.error('Error! Invalid email or password.');

        console.log(error);
      }
    },
  });

  const { handleChange, handleSubmit, errors } = formik;

  return (
    <>
      <div className='shadow-md rounded-xl p-6 w-full max-w-lg mt-8'>
        <div className='mb-4'>
          <p className='text-neutral font-bold text-2xl'>Sign In</p>
          <p className='text-gray-600 text-sm'>
            Login to your Afribiz Trade Investment account
          </p>
        </div>
        <form className='gap-6 py-4' onSubmit={handleSubmit}>
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='email'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Email Address *
            </label>
            <TextInput
              type='email'
              id='email'
              placeholder=''
              className='px-4 py-3 outline-none border border-gray-100 w-full rounded-md text-gray-600 bg-[#ffffff14]'
              required
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <div className='w-full mb-4 flex flex-col gap-3 relative'>
            <label
              htmlFor='password'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Password *
            </label>
            <TextInput
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder=''
              className='px-4 py-3 outline-none border border-gray-100 w-full rounded-md text-gray-600 bg-[#ffffff14]'
              required
              onChange={handleChange}
              rightIcon={<AiOutlineEye />}
              rightIconClick={() => setPasswordVisible(!passwordVisible)}
              error={errors.password}
            />
          </div>
          <Button color="primary_2" type='submit' loading={formik.isSubmitting} block>
            Sign In
          </Button>
        </form>
        <p className='mt-4 text-dark text-center text-sm'>
          Don`t have an account?{' '}
          <Link href='/auth/register' className='text-[#0177FB]  font-semibold'>
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
