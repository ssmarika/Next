import { productCategories } from '@/constants/general.constants';
import * as Yup from 'yup';

export const addProductValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .trim()
    .max(55, 'Name must be at max 55'),
  brand: Yup.string()
    .required('Brand is required')
    .trim()
    .max(55, 'Brand must be at max 55'),
  price: Yup.number()
    .required('Price is required')
    .moreThan(0, 'Price cannot be zero'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1'),
  category: Yup.string()
    .trim()
    .required('Category is required')
    .oneOf(productCategories),
  freeShipping: Yup.boolean().default(false),
  description: Yup.string()
    .required('Description is required')
    .trim()
    .min(300, 'description must be at least 300 characters')
    .max(1000, 'Description must be at max 1000  character'),
});
