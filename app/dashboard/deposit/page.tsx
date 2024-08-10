'use client';
import AccountBalance from '@/components/Dashboard/AccountBalance';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Meta from '@/components/Global/Meta';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import UserDataContext from '@/context/UserDataContext';
import { DISPLAY_WALLET, IDeposit, ITransaction } from '@/interface';
import { UserService } from '@/services/user';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsBank2 } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { ImFilesEmpty } from 'react-icons/im';
import { SiBlockchaindotcom } from 'react-icons/si';
import * as Yup from 'yup';

type CryptoAdress = {
  btc: string;
  eth: string;
  usdt: string;
};

interface IFORMDATA {
  amount: number;
  asset: string;
  proofOfPayment: string;
}
const initialValues = {
  amount: '',
  asset: '',
  proofOfPayment: '',
};

const schema = Yup.object({
  amount: Yup.string().required().label('Amount'),
  asset: Yup.string().required().label('Asset'),
  proofOfPayment: Yup.object(),
});

const transactions: IDeposit[] = [
  {
    amount: 15000,
    asset: 'btc',
    userId: '123456789',
    date: Timestamp.now(),
    status: 'pending',
    type: 'deposit',
    _id: '123456789',
    currency: '$',
  },
  {
    amount: 115000,
    asset: 'eth',
    userId: '123456789',
    date: Timestamp.now(),
    status: 'declined',
    type: 'deposit',
    _id: '123456789',
    currency: '$',
  },
];

function Deposit() {
  const [modal, setModal] = useState(false);
  const [viewTransactionModal, setViewTransactionModal] = useState(false);
  const { userData } = useContext(UserDataContext);

  const [document1, setDocument1] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit>({
    amount: 0,
    asset: '',
    userId: '',
    date: Timestamp.now(),
    status: '',
    type: '',
    _id: '',
    currency: '',
  });

  const [cryptoAdresses, setCryptoAddresses] = useState<any>({
    btc: '1234509asc87446543123451236789',
    eth: '123452re45123fd098765431236789',
    usdt: '12345c8744654re45123fd0316789',
  });

  useEffect(() => {
    const fetchWallets = async () => {
      const walletRef = doc(db, 'wallets', 'crypto');
      onSnapshot(walletRef, (snap) => {
        if (snap.exists()) {
          setCryptoAddresses(snap.data() as CryptoAdress);
        }
      });
    };

    fetchWallets();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit(values) {
      createNewDeposit(values);
    },
  });

  const createNewDeposit = async (values: any) => {
    let body = {
      ...values,
      proofOfPayment: document1,
      userId: userData?._id,
      status: 'pending',
      type: 'deposit',
      currency: userData?.currency,
      date: Timestamp.now(),
    } as IDeposit;

    try {
      setIsLoading(true);

      if (userData)
        await UserService.sendDepositRequest(userData!?._id, body).then(() => {
          toast.success('Deposit placed.');
          setModal(false);

          formik.resetForm();
          setDocument1(null);
        });

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      toast.error('Error! Cannot place deposit ');
    }
  };

  const wallets: DISPLAY_WALLET[] = [
    { title: 'Deposit', price: `${userData?.wallet.deposit}` },
    { title: 'Profit', price: `${userData?.wallet.profit}` },
  ];

  if (!userData) return;

  return (
    <>
      <Meta title='Deposit  |  HERO FX TRADE' />
      <TradingViewTicker />
      <div className='grid md:grid-cols-2 items-center gap-4 max-w-2xl mt-8 mb-16 text-white'>
        <div
          className='p-8 bg-dark border border-gray-100 rounded-3xl'
          onClick={() => setModal(!modal)}
        >
          <p className='text-xl font-bold'>Fund Via Crypto</p>
          <div className='text-right'>
            <BsBank2 className='text-4xl mt-4 text-right' />
          </div>
        </div>
        <div
          className='p-8 bg-secondary border border-gray-100 rounded-3xl'
          onClick={() =>
            toast.success('Contact support for payment via local bank.')
          }
        >
          <p className='text-xl font-bold'>Fund Via Local Bank</p>
          <div className='text-right'>
            <SiBlockchaindotcom className='text-4xl mt-4 text-right' />
          </div>
        </div>
      </div>
      <AccountBalance />

      {userData?.deposits && userData?.deposits?.length === 0 && (
        <Card>
          <div className='flex justify-between items-center'>
            <h5 className='text-gray-700 text-xl font-bold'>Recent Deposit</h5>
            <span className=' p-1 px-2 text-sm rounded-md border border-primary text-primary'>
              {userData?.deposits.length}
            </span>
          </div>

          <div className='text-gray-500 flex flex-col justify-center items-center my-7 gap-5'>
            <ImFilesEmpty fontSize={100} />
            <p>No Deposit Yet</p>
          </div>
        </Card>
      )}

      {/* Transaction History */}
      {userData?.deposits && userData?.deposits?.length > 0 && (
        <TransactionHistory data={userData.deposits} />
      )}

      <Modal
        isOpen={modal}
        handleClose={() => {
          setDocument1(null);
          setModal(!modal);
          formik.resetForm();
        }}
        title='Deposit'
      >
        <form onSubmit={formik.handleSubmit} className=' flex flex-col gap-5'>
          <div className=' flex flex-col gap-2'>
            <label htmlFor='amount'>Enter Amount</label>
            <TextInput
              name='amount'
              id='amount'
              onChange={formik.handleChange}
              value={formik.values.amount}
              placeholder='Enter Amount'
              type='number'
            />
          </div>

          <div className=' flex flex-col gap-2'>
            <label htmlFor='selectAsset'>Select Asset</label>
            <select
              onChange={formik.handleChange}
              name='asset'
              id='selectAsset'
            >
              <option className=' text-white' defaultChecked value=''>
                Select Asset
              </option>
              <option value='btc'>BTC</option>
              <option value='eth'>ETH</option>
              <option value='usdt'>USDT</option>
            </select>
          </div>

          <div>
            {formik.values.asset && (
              <div>
                <Card>
                  <div className='flex flex-col gap-3 text-gray-700 mb-4'>
                    <p className=' text-sm capitalize'>Wallet Address: </p>
                    <p className='text-sm'>
                      {cryptoAdresses[formik.values.asset]}
                    </p>
                  </div>

                  <Button
                    type='button'
                    variant='outlined'
                    onClick={() => {
                      window?.navigator?.clipboard
                        .writeText(`123456eyXkdYkkvpt1i41nXzuTf9QHJQLa789`)

                        .then(() => {
                          toast.success('Link Copied');
                        });
                    }}
                    size='small'
                  >
                    <FaCopy />
                    Copy
                  </Button>
                </Card>

                <Card>
                  <p className='text-gray-500 text-sm'>
                    NOTE: Sending any other coins other than the selected, may
                    result in permanent loss
                  </p>
                </Card>
              </div>
            )}
          </div>

          {formik.values.asset && (
            <div className=' flex flex-col gap-2'>
              <label htmlFor='proofOfPayment' className='block mb-4'>
                Enter Proof Of Payment
              </label>

              {document1 && (
                <Image
                  alt={document1?.name}
                  className='max-h-60 w-full object-contain block mb-4'
                  width={100}
                  height={100}
                  src={URL.createObjectURL(document1)}
                />
              )}
              <TextInput
                type='file'
                name='proofOfPayment'
                id='proofOfPayment'
                placeholder='File Upload'
                className='bg-secondary'
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) setDocument1(e.target?.files[0]);
                }}
                accept='.jpg, .jpeg, .png'
              />
            </div>
          )}

          <Button type='submit' loading={isLoading} block>
            Continue
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={viewTransactionModal}
        handleClose={() => setViewTransactionModal(!viewTransactionModal)}
        title='Deposit Details'
      >
        <div className=' flex flex-col gap-5 w-full divide-y-[0.23px] divide-[#caf2e1]'>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Reference</p>
            <p className=' text-sm text-[#caf2e1]'>{selectedDeposit._id}</p>
          </div>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Amount</p>
            <p className=' text-sm text-[#caf2e1]'>{selectedDeposit.amount}</p>
          </div>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Status</p>
            <p className=' text-sm text-[#caf2e1]'>{selectedDeposit.status}</p>
          </div>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Type</p>
            <p className=' text-sm text-[#caf2e1]'>{selectedDeposit.type}</p>
          </div>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Asset</p>
            <p className=' text-sm text-[#caf2e1]'>{selectedDeposit.asset}</p>
          </div>
          <div className=' flex gap-3 justify-between items-center p-2'>
            <p className=' text-sm text-[#caf2e1]'>Date</p>
            <p className=' text-sm text-[#caf2e1]'>
              {selectedDeposit.date.toDate().toLocaleString()}
            </p>
          </div>

          <div>
            <Image
              alt='transaction_image'
              src={`${selectedDeposit.proofOfPayment}`}
              className=' w-full'
              height={300}
              width={300}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Deposit;
