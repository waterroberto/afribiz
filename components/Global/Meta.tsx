import Head from 'next/head';
import React from 'react';

interface IProps {
  title?: string;
  description?: string;
}

const Meta = ({
  title = 'Dashboard | Blue Chips Trade',
  description = 'Effortlessly increase your trading potential',
}: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href='' />
    </Head>
  );
};

export default Meta;
