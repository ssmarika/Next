'use client';
import BuyerList from '@/component/BuyerList';
import SellerList from '@/component/SellerList';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const Home = () => {
  const router = useRouter();

  const userRole = localStorage.getItem('userRole');
  return (
    <div className='flex flex-col justify-center align-middle gap-4'>
      <p className='text-5xl bold underline'>
        Welcome {window.localStorage.getItem('firstName')}
      </p>

      <Button
        sx={{ width: '400px' }}
        variant='contained'
        color='secondary'
        size='large'
        onClick={() => {
          router.push('/addproduct');
        }}
      >
        Add Product
      </Button>

      {userRole === 'buyer' ? <BuyerList /> : <SellerList />}
    </div>
  );
};

export default Home;
