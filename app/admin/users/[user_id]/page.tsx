'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Loader from '@/components/Global/Loader';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import TransactionHistory from '@/components/Shared/TransactionHistory';
import { db } from '@/config/firebase.config';
import { TransactionType, UserDataType } from '@/interface';
import { UserService } from '@/services/user';
import { formatDate } from '@/utils/utils';
import emailjs from '@emailjs/browser';
import {
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import moment from 'moment';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiCalendarDate, CiLock, CiMail, CiUser } from 'react-icons/ci';
import { SlPhone } from 'react-icons/sl';

const UserDetails = () => {
  const router = useRouter();
  const params = useParams();

  const [amount, setAmount] = useState('');
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);
  const [modal5Open, setModal5Open] = useState(false);
  const [modal6Open, setModal6Open] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceType, setBalanceType] = useState('deposit');

  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setIsLoading(true);
    let unsub = () => {};
    if (params.user_id) {
      try {
        const ref = doc(db, 'users', params.user_id as string);
        unsub = onSnapshot(ref, (doc) => {
          setUserData(doc.data() as UserDataType);
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error('Error fetching user data');
      }

      return () => {
        unsub();
      };
    }
  }, [params.user_id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: '',
      type: 'deposit',
      amount: +amount,
      method: 'bank',
      date: Timestamp.now(),
      status: 'approved',
      currency: userData?.currency,
    };

    if (+amount > 0) {
      if (userData) {
        toast.loading('Setting balance...');

        const ref = doc(db, 'users', userData._id);
        const user = (await getDoc(ref)).data() as UserDataType;

        await updateDoc(ref, {
          wallet: {
            ...user.wallet,
            [balanceType]: user.wallet[balanceType] + +amount,
          },
        })
          .then(() => {
            UserService.sendDepositRequest(userData?._id, data as any).then(
              () => {
                toast.dismiss();
                toast.success(`Account top up succesfully.`);

                emailjs
                  .send(
                    'service_ce42cqj',
                    'template_wuswlfh',
                    {
                      subject: 'Afribiz Trade Investment - Transaction Notification',
                      receiver: `${userData.fullname}`,
                      message1: `This is to inform you that a transaction has occured on your account with Afribiz Trade Investment.`,
                      message2: `\nDetails are below:\n
                     Account Name: ${
                       userData.fullname
                     }\nTransaction Type: CREDIT ALERT\nTransaction Amount: ${
                        userData.currency
                      }${(+amount).toLocaleString()}\nCurrent Balance: ${
                        userData.currency
                      }${(
                        user.wallet[balanceType] + +amount
                      ).toLocaleString()}\nDate:   ${moment().format(
                        'MMM Do YYYY, h:mm a'
                      )}\n
                       `,
                      receiver_email: userData.email,
                    },
                    'y8lxRpg3Vc36vRzy-ODHc'
                  )
                  .then(
                    (result) => {
                      console.log(result.text);
                    },
                    (error) => {
                      console.log(error.text);
                    }
                  );
                setModalOpen(false);
              }
            );
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });
      }

      setAmount('');
    } else toast.error('Amount must be more than 0.00');
  };

  const handleSetWithdrawLimit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (+amount > 0) {
      if (userData) {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id);

        await updateDoc(ref, {
          withdrawLimit: +amount,
        })
          .then(() => {
            toast.dismiss();
            toast.success(`Succesful.`);
            setModal4Open(false);

            setAmount('');
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });

        setAmount('');
      }
    } else toast.error('Amount must be more than 0.00');
  };

  const handleSetTradingPercentage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (+amount > 0) {
      if (userData) {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id);

        await updateDoc(ref, {
          tradingPercentage: +amount,
        })
          .then(() => {
            toast.dismiss();
            toast.success(`Succesful.`);
            setModal6Open(false);

            setAmount('');
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });

        setAmount('');
      }
    } else toast.error('Amount must be more than 0.00');
  };

  const handleClick = async () => {
    try {
      toast.loading('Deleting user...');
      const res = await fetch('/api/firebase-admin', {
        method: 'POST',
        body: JSON.stringify({ uid: userData?._id }),
      });

      toast.dismiss();
      toast.success('User deleted successfully');
      router.replace('/admin');
    } catch (error) {
      toast.success('Error deleting user');
      console.error('Error fetching data:', error);
    }
  };

  const handleProcessKyc = async (status: boolean) => {
    if (userData) {
      toast.loading('Loading...');

      const ref = doc(db, 'users', userData?._id);

      await updateDoc(ref, {
        kyc_approved: status,
        kyc_pending: false,
      })
        .then(() => {
          emailjs
            .send(
              'service_ce42cqj',
              'template_wuswlfh',
              {
                subject: 'Afribiz Trade Investment - KYC Verification',
                receiver: `${userData.firstName} ${userData.lastName}`,
                message1: status
                  ? 'We`re delighted to inform you that your KYC verification has been successfully processed and approved!'
                  : 'Thank you for submitting your KYC documents. We appreciate your cooperation in completing this important step. After careful review, your KYC documentation could not be verified at this time. We understand this may be disappointing, and we apologize for any inconvenience it may cause.',
                message2: status
                  ? 'Now that your KYC is approved, you can enjoy the full benefits of Afribiz Trade Investment. We look forward to serving you as a valued client!'
                  : 'If you have any questions or need assistance, please do not hesitate to contact our support team. Thank you for understanding and cooperation.',
                receiver_email: userData.email,
              },
              'y8lxRpg3Vc36vRzy-ODHc'
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );

          toast.dismiss();
          toast.success(`Succesful.`);
        })
        .catch((err) => {
          toast.error('Error performing this action');
          console.log(err);
        });
    }
  };

  const debitUserAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: '',
      type: 'withdraw',
      amount: +amount,
      status: 'approved',
      method: '',
      asset: '',
      date: Timestamp.now(),
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      currency: userData?.currency,
    };

    if (+amount > 0) {
      if (userData) {
        toast.loading('Debiting account...');

        const ref = doc(db, 'users', userData._id);
        const user = (await getDoc(ref)).data() as UserDataType;

        await updateDoc(ref, {
          wallet: {
            ...user.wallet,
            [balanceType]: user.wallet[balanceType] - +amount,
          },
        })
          .then(() => {
            UserService.sendWithdrawalRequest(userData._id, data as any).then(
              () => {
                toast.dismiss();
                toast.success(`Account debited succesfully.`);
                setModal5Open(false);
              }
            );
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });
      }

      setAmount('');
    } else toast.error('Amount must be more than 0.00');
  };

  const setUserBlockedStatus = async () => {
    if (userData) {
      try {
        toast.loading('Loading...');

        const ref = doc(db, 'users', userData?._id);
        const data = (await getDoc(ref)).data();

        const isBlocked = data?.isBlocked ?? false;

        console.log('Blocked: ', isBlocked);

        await updateDoc(ref, {
          isBlocked: !isBlocked,
        }).then(() => {
          toast.dismiss();
          toast.success('Completed.');
        });
      } catch (error) {
        toast.error('Something went wrong.');
      }
    }
  };

  const processTransaction = async (
    type: string,
    status: string,
    id: string,
    amount: number
  ) => {
    const collectionType =
      type === 'deposit' ? 'depositRequests' : 'withdrawalRequests';

    if (userData) {
      toast.loading('Updating transaction...');

      const ref = doc(db, collectionType, id);

      const userRef = doc(db, 'users', userData._id);

      await getDoc(ref)
        .then((_res) => {
          getDoc(userRef)
            .then((res) => {
              if (res.exists() && res.data()) {
                const index = type === 'deposit' ? 'deposits' : 'withdrawals';

                const trxns = res?.data()[index];
                const filtered = trxns.filter(
                  (trx: TransactionType) => trx._id !== id
                );

                const current = trxns.find(
                  (trx: TransactionType) => trx._id === id
                );
                const updated = { ...current, status };

                const docRef = doc(db, collectionType, id);

                toast.dismiss();
                toast.success('Successful');

                updateDoc(userRef, {
                  [index]: [...filtered, updated],
                  "wallet.deposit":
                    status === 'approved'
                      ? res.data().wallet.deposit + amount
                      : res.data().depositBalance,
                })
                  .then(() => {
                    updateDoc(docRef, {
                      status,
                    })
                      .then(() => {
                        toast.dismiss();
                        toast.success('Successful');
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => {
              toast.dismiss();
              toast.error('Error processing action. Contact developer');
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className='min-h-screen'>
        {isLoading && !userData && (
          <div className='mt-8'>
            <Card>
              <Loader />
            </Card>
          </div>
        )}
        {!isLoading && !userData && (
          <div className='mt-8 text-neutral'>
            <Card>
              <p className='text-3xl text-neutral'>Cannot fetch details</p>
            </Card>
          </div>
        )}
        {/* 1 */}
        {!isLoading && userData && (
          <>
            <Card>
              <p className='mb-8 text-gray-700'>ACCOUNT DETAILS</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 my-4 text-gray-400'>
                <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Capital
                  </p>
                  <p className='text-neutral font-bold text-2xl'>
                    {userData?.currency}
                    {userData?.wallet.deposit.toLocaleString()}
                  </p>
                </div>
                <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Profit
                  </p>
                  <p className='text-neutral font-bold text-2xl'>
                    {userData?.currency}
                    {userData?.wallet.profit.toLocaleString()}
                  </p>
                </div>
                <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Bonus
                  </p>
                  <p className='text-neutral font-bold text-2xl'>
                    {userData?.currency}
                    {userData?.wallet.bonus.toLocaleString()}
                  </p>
                </div>
                <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Trading Percentage
                  </p>
                  <p className='text-neutral font-bold text-2xl'>
                    {userData?.tradingPercentage}%
                  </p>
                </div>
                <div className='p-4 border border-gray-100 rounded-xl'>
                  <p className='text-gray-700 uppercase text-[12px] mb-2'>
                    Withdrawal Limit
                  </p>
                  <p className='text-neutral font-bold text-2xl'>
                    {userData?.currency &&
                      userData?.withdrawLimit &&
                      userData?.currency}

                    {userData?.withdrawLimit
                      ? userData?.withdrawLimit.toLocaleString()
                      : 'Not set'}
                  </p>
                </div>
              </div>
              {/* Credit or Debit Account */}
              <div className='grid grid-cols-2 gap-4 mt-12'>
                <Button
                  color='success'
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  block
                >
                  Credit
                </Button>
                <Button
                  color='danger'
                  onClick={() => setModal5Open(true)}
                  block
                >
                  Debit
                </Button>
              </div>
            </Card>
            <div className='grid grid-cols-1 xl:grid-cols-6 gap-6'>
              {/* Column 1 */}
              <div className='xl:col-span-2'>
                <Card>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
                    {/* User Country*/}
                    {userData?.country && (
                      <div className='flex items-center gap-2 mt-4'>
                        <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                          <CiLock />
                        </div>
                        <div className='flex-1'>
                          <p className='text-neutral font-medium'>Country</p>
                          <p className='text-neutral font-light text-sm'>
                            {userData?.country}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* User Id */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <CiUser />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'>User ID</p>
                        <p className='text-neutral font-light text-sm'>
                          {userData?._id}
                        </p>
                      </div>
                    </div>
                    {/* User Email */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <CiMail />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'> Email</p>
                        <p className='text-neutral font-light text-sm'>
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                    {/* Password */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <CiLock />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'>Password</p>
                        <p className='text-neutral font-light text-sm'>
                          {userData?.password}
                        </p>
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <SlPhone />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'>Phone Number</p>
                        <p className='text-neutral font-light text-sm'>
                          {userData?.phone}
                        </p>
                      </div>
                    </div>
                    {/* Date of Birth */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <CiCalendarDate />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'>
                          Date of Birth
                        </p>
                        <p className='text-neutral font-light text-sm'>
                          {formatDate(userData?.DOB?.seconds * 1000)}
                        </p>
                      </div>
                    </div>
                    {/* Date Joined */}
                    <div className='flex items-center gap-2 mt-4'>
                      <div className='h-10 w-10 bg-gray-200  rounded-full flex items-center justify-center text-xl text-neutral'>
                        <CiCalendarDate />
                      </div>
                      <div className='flex-1'>
                        <p className='text-neutral font-medium'>Date Joined</p>
                        <p className='text-neutral font-light text-sm'>
                          {formatDate(userData?.timeStamp?.seconds * 1000)}
                        </p>
                      </div>
                    </div>

                    {/*  */}
                    <div className='mt-8'>
                      <Button
                        block
                        onClick={setUserBlockedStatus}
                        color={userData.isBlocked ? 'dark' : 'secondary'}
                      >
                        {userData?.isBlocked
                          ? 'Activate User'
                          : 'Dectivate User'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Column 2 */}
              <div className='xl:col-span-4'>
                <Card>
                  <div className='grid sm:grid-cols-2 items-center gap-4 mb-8'>
                    <Button
                      color='secondary'
                      onClick={() => setModal4Open(true)}
                    >
                      Set Withdrawal Limit
                    </Button>
                    <Button color='dark' onClick={() => setModal6Open(true)}>
                      Set Trading Percentage
                    </Button>
                  </div>
                  <TransactionHistory
                    data={
                      [
                        ...userData?.deposits,
                        ...userData?.withdrawals,
                      ] as TransactionType[]
                    }
                    processTransaction={processTransaction}
                  />
                </Card>
                <div className='my-4'></div>
              </div>
            </div>
          </>
        )}
        {/* 2 */}
        {!isLoading && userData && (
          <>
            <Modal
              title={`TOP UP ACCOUNT`}
              isOpen={modalOpen}
              handleClose={handleClose}
            >
              <form onSubmit={handleSubmit}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='balanceType'
                    className='block text-sm text-gray-600 mb-2'
                  >
                    Select Wallet to Fund*
                  </label>
                  <select
                    id='balanceType'
                    required
                    value={balanceType}
                    onChange={(e) => setBalanceType(e.target.value)}
                  >
                    <option value='deposit'>Capital</option>
                    <option value='profit'>Profit</option>
                    <option value='bonus'>Bonus</option>
                    <option value='investment'>Investment</option>
                  </select>
                </div>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='block text-sm text-gray-600 mb-2'
                  >
                    Input New Balance*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Input New Balance'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button type='submit' rounded color='dark' block>
                  Set Balance
                </Button>
              </form>
            </Modal>

            <Card>
              {!userData?.documents?.ID &&
                !userData?.documents?.passport &&
                !userData?.kyc_documents && (
                  <p className='text-gray-700 font-light text-3xl text-center p-8'>
                    No Documents
                  </p>
                )}
              <div className='items-center mx-auto'>
                {userData?.documents?.passport && (
                  <div className='col-span-6 md:col-span-4 lg:col-span-3 w-full'>
                    <div className='my-4 px-2'>
                      <p className='mb-4 text-xl font-bold'>Selfie</p>
                      <Image
                        alt='Passport photograph'
                        src={userData?.documents?.passport}
                        width={500}
                        height={500}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}
                {userData.kyc_documents && (
                  <div>
                    <p className='text-lg font-extrabold mb-8 text-gray-700'>
                      KYC Documents
                    </p>
                    <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 mx-auto max-w-4xl'>
                      {userData.kyc_documents.map((document: string) => (
                        <Image
                          key={document}
                          src={document}
                          alt={userData.id}
                          className='w-full'
                          width={200}
                          height={200}
                        />
                      ))}
                    </div>
                    {/*  */}
                    {!userData?.kyc_approved && (
                      <div className='mt-8 grid items-center grid-cols-2 gap-8 max-w-md mx-auto'>
                        <Button
                          color='success'
                          onClick={() => handleProcessKyc(true)}
                          block
                        >
                          Approve
                        </Button>
                        <Button
                          color='danger'
                          onClick={() => handleProcessKyc(false)}
                          block
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <div className='grid sm:grid-cols-2 gap-4'>
                <Button
                  block
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete this account? This action cannot be undone.'
                      )
                    )
                      handleClick();
                    else return;
                  }}
                >
                  Delete User
                </Button>
              </div>
            </Card>

            {/*  */}
            <Modal
              title={`Set withdrawal limit`}
              isOpen={modal4Open}
              handleClose={() => setModal4Open(false)}
            >
              <form onSubmit={handleSetWithdrawLimit}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='text-sm text-gray-600 mb-2'
                  >
                    Input Withdrawal Limit*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Withdrawal Limit'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button type='submit'>Submit</Button>
              </form>
            </Modal>
            {/*  */}
            <Modal
              title={`Set Trading Percentage`}
              isOpen={modal6Open}
              handleClose={() => setModal6Open(false)}
            >
              <form onSubmit={handleSetTradingPercentage}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='text-sm text-gray-600 mb-2'
                  >
                    Trading Percentage*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Trading Percentage'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button type='submit'>Submit</Button>
              </form>
            </Modal>
            {/*  */}
            <Modal
              title={`Debit User Account`}
              isOpen={modal5Open}
              handleClose={() => setModal5Open(false)}
            >
              <form onSubmit={debitUserAccount}>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='balanceType'
                    className='block text-sm text-gray-600 mb-2'
                  >
                    Choose Wallet to Debit*
                  </label>
                  <select
                    id='balanceType'
                    required
                    value={balanceType}
                    onChange={(e) => setBalanceType(e.target.value)}
                  >
                    <option value='deposit'>Capital</option>
                    <option value='profit'>Profit</option>
                    <option value='bonus'>Bonus</option>
                    <option value='investment'>Investment</option>
                  </select>
                </div>
                <div className='w-full col-span-1 mb-4'>
                  <label
                    htmlFor='amount'
                    className='text-sm text-gray-600 mb-2'
                  >
                    Amount*
                  </label>
                  <TextInput
                    type='number'
                    id='amount'
                    placeholder='Amount'
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button type='submit' rounded block color='dark'>
                  Proceed
                </Button>
              </form>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default UserDetails;
