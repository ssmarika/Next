// ! USE EFFECT

// we prefer using the libraries that provide these functionalities, suppose few events are created
// for optimization we need to clean up the events that have occupied the memory.
// Using libraries these clean ups are done automatically and we do not need to handel these clean up jobs
// for event triggering example refer the resize example of use effect provided by Arun sir

// 'use client';
// import $axios from '@/lib/axios/axios.instance';
// import { Pagination } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import ProductCard from './ProductCard';
// import Loader from './Loader';
// import { isSeller } from '@/utils/check.role';

// const SellerList = () => {
//   const [page, setPage] = useState(1);
//   const [productList, setProductList] = useState([]);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const getSellerProduct = async () => {
//       try {
//         setIsPending(true);
//         const res = await $axios.post('/product/seller/list', {
//           page: page,
//           limit: 2,
//         });

//         setIsPending(false);

//         console.log(res);

//         setProductList((prev) => res?.data?.productList);

//         //! useState async property to be discussed
//         console.log(productList);
//       } catch (error) {
//         setError('Something went wrong');
//         setIsPending(false);
//       } finally {
//         setIsPending(false);
//       }
//     };
//     //to ensure that the API hit occurs only when the user is seller
//     // as we are navigating both the user and seller from the main home page both the api are hit
//     isSeller() && getSellerProduct();
//   }, [page]);

//   if (isPending) {
//     return <Loader />;
//   }

//   if (error) {
//     return <h1>{error}</h1>;
//   }
//   return (
//     <div className='flex flex-col justify-between items-center gap-8'>
//       <div className='card-center'>
//         {productList?.map((item) => {
//           return <ProductCard key={item._id} {...item} />;
//         })}
//       </div>

//       <Pagination
//         page={page}
//         count={5}
//         color='secondary'
//         className='my-12'
//         size='large'
//         onChange={(_, value) => {
//           setPage(value);
//         }}
//       />
//     </div>
//   );
// };

// export default SellerList;
'use client';
import $axios from '@/lib/axios/axios.instance';
import { CircularProgress, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { isBuyer, isSeller } from '@/utils/check.role';

const SellerList = () => {
  const [page, setPage] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ['seller-product-list', page],
    queryFn: async () => {
      return await $axios.post('/product/seller/list', {
        page: page,
        limit: 4,
      });
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: isSeller(), //conditional API hit, make sure to hit the API only when the user is buyer
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

export default SellerList;
