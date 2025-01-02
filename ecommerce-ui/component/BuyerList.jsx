import $axios from '@/lib/axios/axios.instance';
import { CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from './ProductCard';

const BuyerList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['buyer-list'],
    queryFn: async () => {
      return await $axios.post('/product/buyer/list', { page: 1, limit: 10 });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(data);
  const productList = data?.data?.productList;

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <div className='flex flex-col justify-between items-center gap-8'>
      <div className='card-center'>
        {productList?.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>
      <Pagination count={5} color='secondary' />
    </div>
  );
};

export default BuyerList;
