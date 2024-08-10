'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useBoolean } from 'src/hooks/use-boolean';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchOrders } from 'src/apis/order/order-list';
import { updateProfile } from 'src/apis/users/update-profile-api';
import { fetchProfile } from 'src/apis/users/user-profile-api';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { Alert, Button, Snackbar } from '@mui/material';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// ----------------------------------------------------------------------

export default function EcommerceAccountPersonalView() {
  const loading = useBoolean(true);

  useEffect(() => {
    loading.onFalse();
  }, []);

  const passwordShow = useBoolean();

  const EcommerceAccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email address is required'),
    phone: Yup.string().required('Phone number is required'),
    birthday: Yup.mixed<any>().nullable().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
  });

  useEffect(() => {
    fetchProfile().then((response) => {
      setDefaultValues(response.data);
      reset(response.data);
    });
  }, []);

  const [defaultValues, setDefaultValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    address: '',
    // oldPassword: '',
    // newPassword: '',
    // confirmNewPassword: '',
  });

  const methods = useForm({
    resolver: yupResolver(EcommerceAccountPersonalSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      updateProfile(data).then((data) => {
        console.log('Profile updated successfully:', data);

        sessionStorage.setItem('user', JSON.stringify(data));
      });
      reset();
      console.log('updateProfile', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Personal
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <RHFTextField name="firstName" label="First Name" />

        <RHFTextField name="lastName" label="Last Name" />

        <RHFTextField name="email" label="Email Address" />

        <RHFTextField name="phone" label="Phone Number" />

        <Controller
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Birthday"
              slotProps={{
                textField: {
                  helperText: error?.message,
                  error: !!error?.message,
                },
              }}
              {...field}
              value={field.value}
            />
          )}
        />

        <RHFSelect native name="gender" label="Gender">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>

        <RHFTextField name="address" label="Address" />
      </Box>

      <LoadingButton
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Save Changes
      </LoadingButton>
    </FormProvider>
  );
}
