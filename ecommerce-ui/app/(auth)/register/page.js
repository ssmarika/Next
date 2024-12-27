'use client';
import { registerUserValidationSchema } from '@/validation-schema/register.user.validation';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { genders, roles } from '@/constants/general.constants';
import Link from 'next/link';

const register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/user/register',
        data: values,
      });

      router.push('/');
    } catch (error) {
      console.log('Error');
    }
  };

  return (
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
        console.log(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-between items-center max-w-[600px] shadow-2xl shadow-gray-500 px-8 py-3 min-h-[400px] gap-3'
          >
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
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <div className='flex gap-4'>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formik.values.role}
                  label='Role'
                  {...formik.getFieldProps('role')}
                  sx={{ minWidth: '220px' }}
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
                  sx={{ minWidth: '220px' }}
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
            </div>

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
  );
};

export default register;
