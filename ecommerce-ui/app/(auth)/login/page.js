'use client';
import { loginUserValidationSchema } from '@/validation-schema/login.user.validation.schema';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const login = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/user/login',
        data: values,
      });

      window.localStorage.setItem('token', response?.data?.token);
      window.localStorage.setItem('firstName', response?.data?.user?.firstName);

      window.localStorage.setItem('userRole', response?.data?.user?.role);

      router.push('/');
    } catch (error) {
      console.log('error aayo');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginUserValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} className='auth-form '>
            <Typography variant='h3' color='secondary'>
              Sign in
            </Typography>

            <FormControl fullWidth>
              <TextField label='Email' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <p className='text-red-500'>{formik.errors.email}</p>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label='Password'
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className='text-red-500'>{formik.errors.password}</p>
              ) : null}
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              color='secondary'
              fullWidth
            >
              Login
            </Button>

            <Link
              href='/register'
              className='text-md underline text-blue-600 mt-2'
            >
              New here? Register
            </Link>
          </form>
        );
      }}
    </Formik>
  );
};

export default login;
