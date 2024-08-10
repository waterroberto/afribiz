'use client';
import Button from '@/components/Global/Button';
import Card from '@/components/Global/Card';
import Meta from '@/components/Global/Meta';
import { db } from '@/config/firebase.config';
import AuthContext from '@/context/AuthContext';
import UserDataContext from '@/context/UserDataContext';
import { UserService } from '@/services/user';
import emailjs from '@emailjs/browser';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidImageAdd } from 'react-icons/bi';
import { GiPassport } from 'react-icons/gi';
import { HiIdentification } from 'react-icons/hi';
import { IoDocumentSharp } from 'react-icons/io5';
import { TbLicense } from 'react-icons/tb';

const documents = [
  {
    id: 'id',
    name: 'National ID',
    icon: <HiIdentification />,
  },
  {
    id: 'passport',
    name: 'passport',
    icon: <GiPassport />,
  },
  {
    id: 'license',
    name: 'Driving License',
    icon: <TbLicense />,
  },
];

export default function AccountUpgrade() {
  const router = useRouter();
  const [activeDoc, setActiveDoc] = useState('passport');
  const [document1, setDocument1] = useState<File | null>(null);
  const [document2, setDocument2] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useContext(UserDataContext);

  const uploadKycDocuments = async () => {
    if (document1 && document2) {
      if (userData?._id) {
        setIsLoading(true);

        try {
          const kyc_documents: string[] = [];

          [document1, document2].forEach((document) => {
            UserService.getUrlFromFileUpload(
              'kycDocuments',
              userData._id,
              new Date().getUTCMilliseconds().toString(),
              document
            ).then((res) => {
              kyc_documents.push(res);

              const userRef = doc(db, 'users', userData?._id);

              updateDoc(userRef, {
                kyc_documents,
                kyc_submitted: true,
                kyc_approved: false,
                kyc_pending: true,
              }).then(() => {
                emailjs
                  .send(
                    'service_ce42cqj',
                    'template_wuswlfh',
                    {
                      subject: 'Blue Chips Trade - KYC Submission',
                      receiver: `${userData.fullname}`,
                      message1:
                        'Your KYC documentation has been received and is under review by our support team.',
                      message2:
                        'Please await our reponse and tend patience as your documents undergo verification.',
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

                toast.success('Kyc documents uploaded sucessfully.');

                setIsLoading(false);

                setDocument1(null);
                setDocument2(null);
              });
            });
          });
        } catch (error) {
          setIsLoading(true);
          toast.error('Error! Cannot upload documents');

          console.log(error);
        }
      }
    } else {
      if (!document1) {
        toast.error('Please upload front of document');
      }
      if (!document2) {
        toast.error('Please upload back of document');
      }
    }
  };

  return (
    <>
      <Meta
        title='Blue Chips Trade - KYC Verification - Online Bank'
        description='Blue Chips Trade | KYC Verification'
      />
      {!userData?.kyc_submitted && (
        <div>
          <Card>
            <p className='text-gray-600'>
              Verify your identity by uploading any of the documents below.
              Documents are subject to review by our agents.
            </p>
          </Card>
          <div className='text-gray-800 mt-8 flex flex-col sm:flex-row gap-4 mb-8'>
            {documents.map((doc) => (
              <Button
                type='button'
                key={doc.id}
                onClick={() => setActiveDoc(doc.id)}
                color={activeDoc === doc.id ? 'primary' : 'dark'}
                startIcon={doc.icon}
              >
                {doc.name}
              </Button>
            ))}
          </div>
          <Card>
            <div className='p-4 text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-8'>
              <div>
                <p className='font-bold mb-4'>Front</p>
                <label
                  htmlFor='documentFront'
                  className='min-h-[200px] border border-blue-200 p-4 rounded-xl cursor-pointer flex items-center justify-center gap-4'
                >
                  {document1 && (
                    <Image
                      alt={document1?.name}
                      className='max-h-80 w-full rounded-lg object-contain'
                      width={100}
                      height={100}
                      src={URL.createObjectURL(document1)}
                    />
                  )}

                  <BiSolidImageAdd className='text-3xl' />
                </label>

                <input
                  type='file'
                  id='documentFront'
                  onChange={(e) => {
                    if (e.target.files) setDocument1(e.target?.files[0]);
                  }}
                  accept='.jpg, .jpeg, .png'
                  className='opacity-0'
                />
              </div>
              <div>
                <p className='font-bold mb-4'>Back</p>
                <label
                  htmlFor='documentBack'
                  className='min-h-[200px] border border-blue-200 p-4 rounded-xl cursor-pointer flex items-center justify-center gap-4'
                >
                  {document2 && (
                    <Image
                      alt={document2?.name}
                      className='max-h-80 w-full rounded-lg object-contain'
                      width={100}
                      height={100}
                      src={URL.createObjectURL(document2)}
                    />
                  )}

                  <BiSolidImageAdd className='text-3xl' />
                </label>
                <input
                  type='file'
                  id='documentBack'
                  onChange={(e) => {
                    if (e.target.files) setDocument2(e.target?.files[0]);
                  }}
                  accept='.jpg, .jpeg, .png'
                  className='opacity-0'
                />
              </div>
              {/*  */}
              <Button
                type='button'
                onClick={uploadKycDocuments}
                disabled={isLoading}
                loading={isLoading}
                block
                size='large'
              >
                Upload
              </Button>
            </div>
          </Card>
        </div>
      )}
      {userData?.kyc_submitted && userData?.kyc_pending && (
        <div className='mt-16 text-gray-600 flex p-8 flex-col items-center justify-center mx-auto gap-4'>
          <IoDocumentSharp className='text-8xl' />
          <p className='text-4xl'>Pending KYC Verification...</p>
        </div>
      )}
      {userData?.kyc_submitted &&
        userData?.kyc_approved &&
        !userData?.kyc_pending && (
          <div className='mt-16 text-green-500 flex p-8 flex-col items-center justify-center mx-auto gap-4'>
            <IoDocumentSharp className='text-8xl' />
            <p className='text-4xl'>KYC Approved</p>
          </div>
        )}
    </>
  );
}
