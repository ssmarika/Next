'use client';
import $axios from '@/lib/axios/axios.instance';
import { CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { isBuyer } from '@/utils/check.role';

const BuyerList = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ['buyer-product-list', page],
    queryFn: async () => {
      return await $axios.post('/product/buyer/list', {
        page: page,
        limit: 4,
      });
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: isBuyer(), //conditional API hit, make sure to hit the API only when the user is buyer
  });
  console.log(data);
  const productList = data?.data?.productList;

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col justify-between items-center gap-8'>
      <div className='card-center'>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
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

export default BuyerList;
