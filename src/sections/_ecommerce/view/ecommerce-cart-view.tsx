'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';


import Iconify from 'src/components/iconify';

import { useContext, useEffect } from 'react';
import { CartContext, CartProvider } from 'src/contexts/cart-context';
import { useBoolean } from 'src/hooks/use-boolean';
import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';
import { CartItemProps } from 'src/types/cart';

// ----------------------------------------------------------------------

export default function EcommerceCartView() {
  const { cartItems } = useContext(CartContext);

  const loading = useBoolean(true);

  useEffect(() => {
    loading.onFalse();
  }, [cartItems]);

  return (
    <CartProvider>
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
    </CartProvider>
  );
}
