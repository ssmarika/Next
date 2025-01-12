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
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();

  const { isPending, data } = useQuery({
    queryKey: ['product-detail'],
    queryFn: async () => {
      return await $axios.get(`/product/detail/${params.id}`);
    },
  });

  const productDetail = data?.data?.product;

  const { isLoading, error, mutate } = useMutation({
    mutationKey: ['edit-product'],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${params.id}`, values);
    },
    onSuccess: () => {
      router.push(`/product/details/${params.id}`);
    },
  });
  return (
    <Box>
      {isPending && <LinearProgress />}
      {productDetail && (
        <Formik
          enableReinitialize
          initialValues={{
            name: productDetail?.name || '',
            brand: productDetail?.brand || '',
            price: productDetail?.price || 0,
            quantity: productDetail?.quantity || 1,
            category: productDetail?.category || '',
            freeShipping: productDetail?.freeShipping || false,
            description: productDetail?.description || '',
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
                  Edit Product
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
                    <FormHelperText error>
                      {formik.errors.brand}{' '}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label='Price'
                    {...formik.getFieldProps('price')}
                    type='number'
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <FormHelperText error>
                      {formik.errors.price}{' '}
                    </FormHelperText>
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

                <Button variant='contained' type='submit' color='secondary'>
                  Edit Product
                </Button>
              </form>
            );
          }}
        </Formik>
      )}
    </Box>
  );
};

export default EditProduct;
