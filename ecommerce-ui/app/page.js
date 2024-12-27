'use client';
import BuyerList from '@/component/BuyerList';
import SellerList from '@/component/SellerList';
import React from 'react';

const Home = () => {
  const userRole = localStorage.getItem('userRole');
  return (
    <div className='flex flex-col justify-center align-middle'>
      <p className='text-5xl bold underline'>
        Welcome {window.localStorage.getItem('firstName')}
      </p>

      {userRole === 'buyer' ? <BuyerList /> : <SellerList />}
    </div>
  );
};

export default Home;
