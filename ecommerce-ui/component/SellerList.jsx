'use client';
import $axios from '@/lib/axios/axios.instance';

import React, { useEffect } from 'react';

const SellerList = () => {
  useEffect(() => {
    try {
      const getProducts = async () => {
        return await $axios.post('/product/seller/list', {
          page: 1,
          limit: 10,
        });
      };
    } catch (error) {
      console.log(error);

      getProducts();
    }
  }, []);
  return <div>SellerList</div>;
};

export default SellerList;
