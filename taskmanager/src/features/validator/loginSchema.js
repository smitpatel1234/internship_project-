import * as yup from 'yup';
export const userSchema = yup.object({
  username: yup.string()
    .min(3, 'Username must have at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),

  email: yup.string()
    .email('Please provide a valid email address')
    .required('Email is required'),

});