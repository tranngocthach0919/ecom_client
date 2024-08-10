'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _products } from 'src/_mock';

import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';

import EcommerceCheckoutNewCardForm from '../checkout/ecommerce-checkout-new-card-form';
import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';
import EcommerceCheckoutShippingMethod from '../checkout/ecommerce-checkout-shipping-method';
import EcommerceCheckoutShippingDetails from '../checkout/ecommerce-checkout-shipping-details';
import EcommerceCheckoutPersonalDetails from '../checkout/ecommerce-checkout-personal-details';
import { useContext, useEffect, useState } from 'react';
import { CartContext, CartTriggerContext } from 'src/contexts/cart-context';
import { CartItemProps } from 'src/types/cart';
import { PaymentMethod, PaymentStatus, ShippingMethod } from 'src/types/order';
import { MakeOrder } from 'src/apis/order/make-order-api';
import { deleteCart } from 'src/apis/carts/delete-cart';

// ----------------------------------------------------------------------

const SHIPPING_OPTIONS = [
  {
    label: 'Free',
    value: 'free',
    description: '5-7 Days delivery',
    price: 0,
  },
  {
    label: 'Standard',
    value: 'standard',
    description: '3-5 Days delivery',
    price: 3,
  }
];

const PAYMENT_OPTIONS = [
  {
    label: 'ZaloPay',
    value: 'zalo_pay',
  },
  {
    label: 'COD',
    value: 'cod',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {
  const { cartItems, dispatch } = useContext(CartContext);
  const { setTrigger }: any = useContext(CartTriggerContext);
  const [total, setTotal] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const newTotal = cartItems?.reduce(
      (acc, cart) =>
        acc + parseFloat(cart.product.salePrice as string) * cart.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const router = useRouter();

  const formOpen = useBoolean();

  const EcommerceCheckoutSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    shipping: Yup.string()
      .oneOf(SHIPPING_OPTIONS.map((option) => option.value))
      .required('Shipping method is required'),
    paymentMethods: Yup.string()
      .oneOf(PAYMENT_OPTIONS.map((option) => option.value))
      .required('Payment method is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    streetAddress: '',
    city: '',
    shipping: SHIPPING_OPTIONS[0].value,
    paymentMethods: PAYMENT_OPTIONS[0].value,
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(EcommerceCheckoutSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const orderData = {
        shippingAddress: data.streetAddress,
        shippingCity: data.city,
        recipientFirstName: data.firstName,
        recipientLastName: data.lastName,
        recipientPhone: data.phoneNumber,
        recipientEmail: data.emailAddress,
        shippingMethod: data.shipping,
        paymentMethod: data.paymentMethods,
        paymentStatus: PaymentStatus.PENDING,
      };

      const makeOrderResponse = await MakeOrder(orderData);

      console.log('Đặt hàng thành công:', makeOrderResponse);
      setSnackbarMessage('Đặt hàng thành công!');
      setSnackbarOpen(true);
      setTimeout(async () => {
        await deleteCart(cartItems[0].id as string);
        dispatch({ type: "DELETE_CART_ITEM", payload: cartItems[0].id as string })
        setTrigger(Math.random())
        router.push(paths.eCommerce.orderCompleted);
      }, 1000);
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Đã xảy ra lỗi khi đặt hàng!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  });

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Checkout
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              <div>
                <StepLabel title="Personal Details" step="1" />
                <EcommerceCheckoutPersonalDetails />
              </div>

              <div>
                <StepLabel title="Shipping Details" step="2" />
                <EcommerceCheckoutShippingDetails />
              </div>

              <div>
                <StepLabel title="Shipping Method" step="3" />
                <EcommerceCheckoutShippingMethod options={SHIPPING_OPTIONS} />
              </div>

              <div>
                <StepLabel title="Payment Method" step="4" />

                <EcommerceCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                <Divider sx={{ my: 3 }} />

                <Stack alignItems="flex-end">
                  <Button
                    color={formOpen.value ? 'error' : 'inherit'}
                    startIcon={
                      <Iconify icon={formOpen.value ? 'carbon:close' : 'carbon:add'} width={24} />
                    }
                    onClick={formOpen.onToggle}
                  >
                    {formOpen.value ? 'Cancel' : 'Add New Card'}
                  </Button>
                </Stack>

                <Collapse in={formOpen.value} unmountOnExit>
                  <EcommerceCheckoutNewCardForm />
                </Collapse>
              </div>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCheckoutOrderSummary
              total={total}
              // subtotal={total}
              shipping={55.47}
              discount={16.17}
              carts={cartItems.slice(0, 3) as CartItemProps[]}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

// ----------------------------------------------------------------------

type StepLabelProps = {
  step: string;
  title: string;
};

function StepLabel({ step, title }: StepLabelProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}
