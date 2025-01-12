'use client';
import $axios from '@/lib/axios/axios.instance';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CartCard from './CartCard';

const CartDetailsPage = () => {
  const [page, setPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ['buyerCartList', page],
    queryFn: async () => {
      return await $axios.post('/cart/list', {
        page: page,
        limit: 3,
      });
    },
  });

  const cartList = data?.data?.cartList;
  console.log(cartList);
  return (
    <div className='flex flex-col justify-between items-center gap-8'>
      <div className='card-center'>
        {cartList?.map((item) => {
          return <CartCard key={item._id} {...item} />;
        })}
      </div>
      <Pagination
        page={page}
        count={5}
        color='secondary'
        size='large'
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default CartDetailsPage;
