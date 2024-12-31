import $axios from '@/lib/axios/axios.instance';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductCard from './ProductCard';

const SellerList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['seller-list'],
    queryFn: async () => {
      return await $axios.post('/product/seller/list', {
        page: 1,
        limit: 10,
        searchText: '',
      });
    },
  });

  console.log(data);

  const productList = data?.data?.products;

  console.log('list', productList);

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <div className='card-center'>
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </div>
  );
};

export default SellerList;
