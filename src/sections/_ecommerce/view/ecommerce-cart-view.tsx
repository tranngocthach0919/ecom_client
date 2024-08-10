'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';


import Iconify from 'src/components/iconify';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchCarts } from 'src/apis/carts/cart-list-api';
import { useBoolean } from 'src/hooks/use-boolean';
import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';
// ----------------------------------------------------------------------

import { Alert, Snackbar } from '@mui/material';
export default function EcommerceCartView() {
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const router = useRouter();

  const fetchCartsData = async () => {
    try {
      const response = await fetchCarts();
      console.log(response);
    } catch (error) {
      if (error.response.status === 401) {
        setOpen(true);
      }
    }
  }

  const loading = useBoolean(true);

  useEffect(() => {
    fetchCartsData()
    loading.onFalse();
  }, []);

  return (
    <>
      <Snackbar open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{
          width: '200%'
        }}>
          Bạn cần phải đăng nhập để xem giỏ hàng <Button onClick={() => router.push('/login')}>Đăng nhập</Button>
        </Alert>
      </Snackbar>
      <Container
        sx={{
          overflow: 'hidden',
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h3" sx={{ mb: 5 }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            {/* <EcommerceCartList carts={(cartItems.slice(0, 4)) as CartItemProps[]} /> */}
            <EcommerceCartList />
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCartSummary
              tax={7}
              shipping={55.47}
              discount={16.17}
            />
          </Grid>
        </Grid>

        <Button
          component={RouterLink}
          href={paths.eCommerce.products}
          color="inherit"
          startIcon={<Iconify icon="carbon:chevron-left" />}
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Container>
    </>
  );
}
