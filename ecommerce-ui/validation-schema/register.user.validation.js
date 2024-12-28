import * as Yup from 'yup';

export const registerUserValidationSchema = Yup.object({
  email: Yup.string().required('Email is required').trim().max(55, 'Email must be at max 55 characters').lowercase().email('Must be a valid email'),
  password: Yup.string().required('Password is required').trim(),
  firstName: Yup.string().required('First Name is required').trim().max(30),
  lastName: Yup.string().required('Last Name is required').trim().max(30),
  gender: Yup.string().required().oneOf(['male', 'female', 'other']),
  role: Yup.string().required().oneOf(['buyer', 'seller']),
});
