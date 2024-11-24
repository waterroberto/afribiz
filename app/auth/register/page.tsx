'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import { auth, db } from '@/config/firebase.config';
import { IPackage, UserDataType } from '@/interface';
import countries from '@/static/countries';
import { currencies } from '@/static/currencies';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import * as Yup from 'yup';

interface ICURRENCY {
  symbol: string;
  code: string;
}

interface IFormData {
  fullname: string;
  username: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  currency: ICURRENCY;
  plan: IPackage;
}

const initialValues = {
  fullname: '',
  username: '',
  phone: '',
  country: '',
  email: '',
  password: '',
  currency: {
    symbol: '',
    code: '',
  },

  plan: {
    name: '',
    min: 0,
    max: 0,
    price: 0,
    interest: 0,
    commission: 0,
    bonus: 0,
  },
};

const schema = Yup.object({
  fullname: Yup.string().required().label('Full Name'),
  username: Yup.string().required().label('Username'),
  phone: Yup.string().required().label('Phone'),
  country: Yup.string().required().label('Country'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(6).required().label('Password'),
  currency: Yup.object({ country: Yup.string(), currency_code: Yup.string() })
    .required()
    .label('Currency'),

  plan: Yup.object({
    name: Yup.string(),
    min: Yup.number(),
    max: Yup.number(),
    price: Yup.number(),
    interest: Yup.number(),
    commission: Yup.number(),
    bonus: Yup.number(),
  }),
});

const Register = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit(values) {
      handleUserRegister(values);
    },
  });

  const handleUserRegister = async (formData: IFormData) => {
    if (Object.keys(formik.errors).length === 0 && termsAndConditions) {
      let dupUserRef;
      try {
        setIsLoading(true);
        console.log('working');

        const userRef = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        dupUserRef = userRef;

        const data: UserDataType = {
          ...formData,
          currency: formData.currency.symbol,
          _id: userRef.user.uid.trim(),
          wallet: {
            bonus: 0,
            deposit: 0,
            investment: 0,
            profit: 0,
            referral: 0,
            withdraw: 0,
          },
          gender: '',
          avatar_url: '',
          kyc_document: {
            type: '',
            documents: [],
          },
          kyc_submitted: false,
          kyc_approved: false,
          kyc_pending: false,
          account_level: 1,
          account_number: '',
          account_name: '',
          bank_name: '',
          swift_code: '',
          bitcoin_address: '',
          ethereum_address: '',
          cashapp_tag: '',
          paypal_email: '',
          deposits: [],
          withdrawals: [],
          investments: [],
          isAdmin: false,
          isVerified: false,
          timestamp: Timestamp.now(),
          nextOfKin: {
            email: '',
            gender: '',
            relationship: '',
            phoneNumber: '',
            name: '',
          },
          isBlocked: false,
          symbol: '',
          plans: [formData.plan],
          tradingPercentage: 0,
        };

        // delete the plan object
        delete data.plan;

        const ref = doc(db, 'users', userRef.user.uid);
        await setDoc(ref, data);

        setIsLoading(false);

        router.push('/auth/login');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        dupUserRef?.user.delete();

        toast.error('Something failed please try again');
      }
    } else {
      toast.error('One or more inputs are invalid');
      if (!termsAndConditions)
        toast.error('Please agree to terms and conditions');
    }
  };

  const { handleChange, values, handleSubmit, errors } = formik;

  const selectedCountryTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className='flex align-items-center gap-3'>
          <div>{option.code}</div>
          <div> - </div>
          <div>{option.symbol}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: any) => {
    return (
      <div className='flex align-items-center gap-3'>
        <div>{option.code}</div>
        <div> - </div>
        <div>{option.symbol}</div>
      </div>
    );
  };

  return (
    <>
      <div className='shadow-md rounded-xl p-6 w-full max-w-lg mt-8'>
        <div className='mb-4'>
          <p className='text-neutral font-bold text-2xl'>Register</p>
          <p className='text-gray-600 text-sm'>
            Create a trading account with Afribiz Trade Investment
          </p>
        </div>
        <form className='gap-6 py-4' onSubmit={handleSubmit}>
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='fullname'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Full Name *
            </label>
            <TextInput
              type='text'
              id='fullname'
              placeholder=''
              className='px-4 py-3 outline-none border border-gray-100 w-full rounded-md text-gray-600 bg-[#ffffff14]'
              required
              onChange={handleChange}
              error={errors.fullname}
            />
          </div>
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='username'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Username *
            </label>
            <TextInput
              type='text'
              id='username'
              placeholder=''
              className='px-4 py-3 outline-none border border-gray-100 w-full rounded-md text-gray-600 bg-[#ffffff14]'
              required
              onChange={handleChange}
              error={errors.username}
            />
          </div>
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
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='phone'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Phone Number *
            </label>
            <TextInput
              type='tel'
              id='phone'
              name='phone'
              placeholder=''
              className='px-4 py-3 outline-none border border-gray-100 w-full rounded-md text-gray-600 bg-[#ffffff14]'
              required
              onChange={handleChange}
              error={errors.phone}
            />
          </div>
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='country'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Nationality *
            </label>
            <Dropdown
              name='country'
              id='country'
              value={values.country}
              onChange={handleChange}
              optionValue='name'
              options={countries}
              optionLabel='name'
              placeholder='Select Country'
              className=' w-full  outline-none border border-gray-100 rounded-xl text-gray-600 bg-[#ffffff14]'
            />
          </div>
          <div className='w-full mb-4 flex flex-col gap-3'>
            <label
              htmlFor='currency'
              className='mb-2 font-medium text-sm text-gray-600'
            >
              Currency *
            </label>
            <Dropdown
              name='currency'
              id='currency'
              value={values.currency}
              onChange={(e) => formik.setFieldValue('currency', e.target.value)}
              // optionValue="country"
              options={currencies}
              optionLabel={`country`}
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              placeholder='Select Currency'
              className=' w-full outline-none border border-gray-100 rounded-xl text-gray-600 bg-[#ffffff14]'
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

          <div className='flex items-center gap-2 mb-4'>
            <label htmlFor='termsAndConditions'>{''}</label>
            <input
              id='termsAndConditions'
              type='checkbox'
              className='text-xl'
              checked={termsAndConditions}
              onChange={() => {
                setTermsAndConditions((prev) => !prev);
              }}
            />
            <p className='text-sm text-gray-600'>
              I have agreed to the Terms & Conditions
            </p>
          </div>

          <Button type='submit' color="primary_2" loading={formik.isSubmitting} block>
            Register
          </Button>
        </form>
        <p className='mt-4 text-dark text-center text-sm'>
          Already have an account?{' '}
          <Link href='/auth/login' className='text-[#0177FB] font-semibold'>
            Sign in instead
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
