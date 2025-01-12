'use client';
import { Button, Checkbox, Chip, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartCard = () => {
  const [count, setCount] = React.useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <Box
      sx={{
        width: 800,
        height: 400,
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        overflow: 'hidden',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '50%',
          height: '100%',
          maxWidth: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          padding: 3,
        }}
      >
        <Image
          src='/jacket.webp'
          alt='Jacket'
          width={350}
          height={350}
          style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
        />
      </Box>
      <Box
        sx={{
          width: '50%',
          height: '100%',
          maxWidth: { xs: '100%', md: '50%' },
          padding: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={2} sx={{ paddingBottom: 2 }}>
          <Typography variant='h4' fontWeight='bold' color='secondary'>
            Jacket
          </Typography>
          <Chip
            label='Patagonia'
            color='secondary'
            sx={{ fontSize: '0.875rem', width: 100 }}
          />
          <Typography variant='body1' color='text.secondary'>
            Category: <strong>Clothing</strong>
          </Typography>

          <Typography variant='body1' color='text.secondary'>
            Price: <strong>$400</strong>
          </Typography>
          <Stack
            direction='row'
            justifyContent='start'
            alignItems='center'
            gap={2}
          >
            <Typography variant='body1' color='text.secondary'>
              Free Shipping
            </Typography>
            <Checkbox color='success' checked={true} />
          </Stack>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 2,
            }}
          >
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
            >
              <IconButton color='success' size='medium' onClick={increaseCount}>
                <AddIcon />
              </IconButton>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                {count}
              </Typography>
              <IconButton
                color='error'
                size='medium'
                onClick={decreaseCount}
                disabled={count === 1}
              >
                <RemoveIcon />
              </IconButton>
            </Stack>
            <Button variant='contained' color='error'>
              Delete
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CartCard;
