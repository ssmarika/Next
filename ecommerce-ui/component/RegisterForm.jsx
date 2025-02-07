'use client';
import { registerUserValidationSchema } from '@/validation-schema/register.user.validation';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { genders, roles } from '@/constants/general.constants';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import $axios from '@/lib/axios/axios.instance';

const RegisterForm = () => {
  //to redirect to the login in page once the registration is successful
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const { isPending, error, data, mutate } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: async (values) => {
      return await $axios.post('/user/register', values);
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  return (
    <Box>
      {/* to show the loading bar */}
      {isPending && <LinearProgress color='secondary' />}

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender: '',
          role: '',
        }}
        validationSchema={registerUserValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit} className='auth-form'>
              <Typography variant='h3' color='secondary'>
                Sign up
              </Typography>

              <div className='flex gap-4'>
                <FormControl>
                  <TextField
                    label='First Name'
                    {...formik.getFieldProps('firstName')}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormHelperText error>
                      {formik.errors.firstName}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label='Last Name'
                    {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormHelperText error>
                      {formik.errors.lastName}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </div>

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

              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formik.values.role}
                  label='Role'
                  {...formik.getFieldProps('role')}
                >
                  {roles.map((item) => {
                    return (
                      <MenuItem
                        value={item.role}
                        key={item.id}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {item.role}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.touched.role && formik.errors.role ? (
                  <FormHelperText error>{formik.errors.role}</FormHelperText>
                ) : null}
              </FormControl>

              {/* <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  {...formik.getFieldProps('gender')}
                  sx={{ minWidth: '220px' }}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='others'>Others</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formik.values.gender}
                  label='Gender'
                  {...formik.getFieldProps('gender')}
                >
                  {genders.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.gender}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {item.gender}
                      </MenuItem>
                    );
                  })}
                </Select>

                {formik.touched.gender && formik.errors.gender ? (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                ) : null}
              </FormControl>

              <Button
                type='submit'
                variant='contained'
                color='secondary'
                fullWidth
                size='large'
              >
                Register
              </Button>

              <Link
                href='/login'
                className='text-md underline text-blue-600 mt-2'
              >
                Already registered? Login
              </Link>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
