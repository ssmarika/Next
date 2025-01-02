// 'use client';
// import $axios from '@/lib/axios/axios.instance';
// import { CircularProgress, Pagination } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import ProductCard from './ProductCard';

// const SellerList = () => {
//   const [page, setPage] = useState(1);
//   const { isPending, error, data } = useQuery({
//     queryKey: ['seller-list', page],
//     queryFn: async () => {
//       return await $axios.post('/product/seller/list', {
//         page: page,
//         limit: 2,
//         searchText: '',
//       });
//     },
//   });

//   console.log(data);

//   const productList = data?.data?.products || [];

//   console.log('list', productList);

//   if (isPending) {
//     <CircularProgress />;
//   }
//   return (
//     <div className='flex flex-col justify-between items-center gap-8'>
//       <div className='flex justify-center items-center gap-8'>
//         {productList?.map((item) => {
//           return <ProductCard key={item._id} {...item} />;
//         })}
//       </div>

//       <Pagination
//         page={page}
//         count={5}
//         color='secondary'
//         // className='card-center'
//         size='large'
//         onClick={(_, value) => {
//           setPage(value);
//         }}
//       />
//     </div>
//   );
// };

// export default SellerList;

// ! USE EFFECT

'use client';
import $axios from '@/lib/axios/axios.instance';
import { CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const SellerList = () => {
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getSellerProduct = async () => {
      try {
        setIsPending(true);
        const res = await $axios.post('/product/seller/list', {
          page: page,
          limit: 2,
        });

        setIsPending(false);

        console.log(res);

        setProductList((prev) => res?.data?.productList);

        //! useState async property to be discussed
        console.log(productList);
      } catch (error) {
        setError('Something went wrong');
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    };

    getSellerProduct();
  }, [page]);

  if (isPending) {
    <CircularProgress />;
  }

  if (error) {
    return <h1>{error}</h1>;
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
        className='my-12'
        size='large'
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default SellerList;
