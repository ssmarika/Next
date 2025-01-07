'use client';
import { loginUserValidationSchema } from '@/validation-schema/login.user.validation.schema';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import $axios from '@/lib/axios/axios.instance';

const LoginForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // ! this is an old method where we handel the error by ourselves using try catch
  // ! but when we use tan stack query this process becomes much easier
  // const handleSubmit = async (values) => {
  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: 'http://localhost:8080/user/login',
  //       data: values,
  //     });

  //     window.localStorage.setItem('token', response?.data?.token);
  //     window.localStorage.setItem('firstName', response?.data?.user?.firstName);

  //     window.localStorage.setItem('userRole', response?.data?.user?.role);

  //     router.push('/');
  //   } catch (error) {
  //     console.log('error aayo');
  //   }
  // };

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: async (values) => {
      return await $axios.post('/user/login', values);
    },
    onSuccess: (response) => {
      window.localStorage.setItem('token', response?.data?.token);
      window.localStorage.setItem('firstName', response?.data?.user?.firstName);

      window.localStorage.setItem('userRole', response?.data?.user?.role);

      router.push('/');
    },
  });

  return (
    <Box>
      {isPending && <LinearProgress />}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginUserValidationSchema}
        onSubmit={(values) => {
          // ! old technique
          // handleSubmit(values);
          mutate(values);
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
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  {...formik.getFieldProps('password')}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />

                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                type='submit'
                variant='contained'
                color='secondary'
                fullWidth
                disabled={isPending}
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
    </Box>
  );
};

export default LoginForm;
