'use client';
import Button from '@/components/Global/Button'
import Card from '@/components/Global/Card'
import { db } from '@/config/firebase.config'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ICRYPTOADDRESS {
      btc: string
      eth: string
      usdt: string
}
function Wallets() {
    const [changeWalletAddressStatus, setChangeWalletAddressStatus] = useState(false);
  const [walletUpdated, setWalletUpdated] = useState(false);

  const formik = useFormik({
    initialValues: {
      btc: "",
      eth: "",
      usdt: ''
    },
    onSubmit(values) {
      console.log(values)
      updateWalletAddresses(values)
  },
  })

    useEffect(() => {
    const fetchWallets = async () => {
      const walletRef = doc(db, 'wallets', 'crypto');
      onSnapshot(walletRef, (snap) => {
        if (snap.exists()) {
         const  data = snap.data() as ICRYPTOADDRESS
          formik.setFieldValue('btc', data.btc);
          formik.setFieldValue('eth', data.eth);
          formik.setFieldValue('usdt', data.usdt);
        }
      });
    };

    fetchWallets();
  }, []);



  const updateWalletAddresses = async (values:ICRYPTOADDRESS ) => {
    toast.success('Setting new wallets...');

    const docRef = doc(db, 'wallets', 'crypto');

    try {
      await updateDoc(docRef, { ...values });
      toast.dismiss();

      toast.success('Successfully updated.');

      setChangeWalletAddressStatus(false);
    } catch (error) {
      console.log(error);
      toast.error('Error! Please contact developer.');
    }
  };


  return (
    <div className='min-h-screen'>
      <Card>
        <div className=' border-b p-4'>
          <h2 className=" text-lg text-gray-700 font-bold">Wallet Addresses & QR Codes</h2>
          <p className="text-sm text-gray-700 font-bold">Change wallet addresses here, and their QR code.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
           <p className='text-xl font-bold mb-4'>Wallet Addresses</p>

            <div className='text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              <div className='w-full col-span-1 my-4'>
                <label
                  htmlFor='btc'
                  className='mb-2 font-semibold text-sm text-gray-800'
                >
                  Bitcoin
                </label>
                <input
                  type='text'
                  id='btc'
                  name="btc"
                  placeholder=''
                  className='p-4 outline-none border-none w-full rounded-md text-gray-200 bg-gray-700 text-sm'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.btc}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
              <div className='w-full col-span-1 my-4'>
                <label
                  htmlFor='eth'
                  className='mb-2 font-semibold text-sm text-gray-800'
                >
                  Ethereum
                </label>
                <input
                  type='text'
                  id='eth'
                  name="eth"
                  placeholder=''
                  className='p-4 outline-none border-none w-full rounded-md text-gray-200 bg-gray-700 text-sm'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.eth}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
              <div className='w-full col-span-1 my-4'>
                <label
                  htmlFor='usdt'
                  className='mb-2 font-semibold text-sm text-gray-800'
                >
                  USDT (TRC20)
                </label>
                <input
                  type='text'
                  id='usdt'
                  name="usdt"
                  placeholder=''
                  className='p-4 outline-none border-none w-full rounded-md text-gray-200 bg-gray-700 text-sm'
                  required
                  onChange={(e) => {
                    formik.handleChange(e)
                    setWalletUpdated(true)
                  }}
                  value={formik.values.usdt}
                  disabled={!changeWalletAddressStatus}
                />
              </div>
            </div>

            <div className='flex justify-between w-full'>
              <Button
                type='button'
                color={`${changeWalletAddressStatus ? '#eb5757' : '#1bea93'}`}
                className={` text-white`}
                onClick={() => {
                  if (changeWalletAddressStatus)
                    setChangeWalletAddressStatus(false);
                  else setChangeWalletAddressStatus(true);
                }}
              >
                {changeWalletAddressStatus ? 'Cancel' : 'Change Wallet Address'}
              </Button>
              {walletUpdated && changeWalletAddressStatus && (
                <Button
                  color={`#1bea93`}
                  type='submit'
                  // className={`btn p-4 px-8 text-white bg-primary`}
                  // onClick={updateWalletAddresses}
                >
                  Submit
                </Button>
              )}
            </div>        
          </form>
      </Card>
    </div>
  )
}

export default Wallets