import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().test((value, context) => {
    if (!value) return context.createError({ message: 'Password is required' });
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const minLength = 8;
    if (value.length < minLength) {
      return context.createError({ message: `Password must be at least ${minLength} characters long` });
    }
    if (!hasUppercase) {
      return context.createError({ message: 'Password must contain at least one uppercase letter' });
    }
    if (!hasNumber) {
      return context.createError({ message: 'Password must contain at least one number' });
    }
    return true;
  }),
});