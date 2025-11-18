import * as Yup from 'yup';
export const userSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must have at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),

  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Email is required'),

});
