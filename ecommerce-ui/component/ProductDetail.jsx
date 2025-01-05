'use client';
import { Padding } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const ProductDetail = () => {
  return (
    <div
      style={{
        width: '1000px',
        height: '500px',
        boxShadow:
          ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
      }}
    >
      <div>
        <img
          src='https://imgs.search.brave.com/CygsbhsaWNI8bR-fJ-hfUW6boP70Y9UeYTNLIPoZop8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kM3U0/ZGhhdWh3dzJhMS5j/bG91ZGZyb250Lm5l/dC9wcm9kdWN0LW1l/ZGlhL1oyLzgwMC84/MDAvU00yMTEyU29u/YW1KYWNrZXQ0MDZU/YWFsLmpwZw'
          alt='Book image'
          style={{ height: '100%', width: '500px', objectFit: 'cover' }}
        />
      </div>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h3'
          color='secondary'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Jacket
        </Typography>
        <Typography variant='h5' gutterBottom>
          Brand: Sonam
        </Typography>
        <Typography variant='h5' gutterBottom>
          Price: 100
        </Typography>
        <Typography variant='h5' gutterBottom>
          Free Shipping : Available
        </Typography>
        {/* <Typography variant='h5' gutterBottom sx={{ objectFit: 'cover' }}>
            Description: Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Pariatur, impedit perfer
          </Typography> */}
      </div>
    </div>
  );
};

export default ProductDetail;
