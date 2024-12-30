'use client';
import { productCategories } from '@/constants/general.constants';
import $axios from '@/lib/axios/axios.instance';
import { addProductValidationSchema } from '@/validation-schema/add.product.validation';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddProduct = () => {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationKey: ['Add-product'],
    mutationFn: async (values) => {
      return await $axios.post('/product/add', values, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  return (
    <Box>
      {isPending && <LinearProgress />}
      <Formik
        initialValues={{
          name: '',
          brand: '',
          price: 0,
          quantity: 1,
          category: '',
          freeShipping: false,
          description: '',
        }}
        validationSchema={addProductValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className='auth-form'>
              <Typography variant='h3' color='secondary'>
                Add Product
              </Typography>
              <FormControl fullWidth>
                <TextField
                  label='Product Name'
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name} </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label='Product Brand'
                  {...formik.getFieldProps('brand')}
                />
                {formik.touched.brand && formik.errors.brand ? (
                  <FormHelperText error>{formik.errors.brand} </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label='Price'
                  {...formik.getFieldProps('price')}
                  type='number'
                />
                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price} </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label='Quantity'
                  {...formik.getFieldProps('quantity')}
                  type='number'
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <FormHelperText error>
                    {formik.errors.quantity}{' '}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select {...formik.getFieldProps('category')}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem
                        value={item}
                        key={index}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.touched.category && formik.errors.category ? (
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label='Description'
                  multiline
                  rows={4}
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'self-start',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox {...formik.getFieldProps('freeShipping')} />
                  }
                  label='Free Shipping'
                  labelPlacement='start'
                />
              </FormControl>

              {console.log(formik.errors)}

              <Button
                variant='contained'
                type='submit'
                color='secondary'
                disabled={isPending}
              >
                Add Product
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddProduct;
