'use client';
import BuyerList from '@/component/BuyerList';
import Header from '@/component/Header';
import SellerList from '@/component/SellerList';
import { isSeller } from '@/utils/check.role';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();

  const [userRole, setUserRole] = useState(null);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    setUserRole(window.localStorage.getItem('userRole'));
    setFirstName(window.localStorage.getItem('firstName'));
  }, []);

  return (
    <div className='flex flex-col justify-center align-middle gap-4'>
      <p className='text-5xl bold underline'>Welcome {firstName}</p>

      {isSeller() && (
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
      )}
      {/* <Button
        sx={{ width: '400px' }}
        variant='contained'
        color='secondary'
        size='large'
        onClick={() => {
          router.push('/addproduct');
        }}
      >
        Add Product
      </Button> */}

      {userRole === 'buyer' ? <BuyerList /> : <SellerList />}
    </div>
  );
};

export default Home;
