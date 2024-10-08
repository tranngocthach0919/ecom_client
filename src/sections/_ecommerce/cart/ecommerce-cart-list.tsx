import Stack from '@mui/material/Stack';

import Scrollbar from 'src/components/scrollbar';


import { useContext } from 'react';
import { CartContext } from 'src/contexts/cart-context';
import { CartItemProps } from 'src/types/cart';
import EcommerceCartItem from './ecommerce-cart-item';

// ----------------------------------------------------------------------

type Props = {
  wishlist?: boolean;
  carts?: CartItemProps[];
};

export default function EcommerceCartList({ wishlist = false }: Props) {
  const { cartItems } = useContext(CartContext);
  const carts = Array.isArray(cartItems) ? [...cartItems] : [];

  return (
    <Scrollbar>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            minWidth: 720,
            typography: 'subtitle2',
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Stack flexGrow={1}>Item</Stack>
          <Stack sx={{ width: 120 }}>Qty</Stack>
          <Stack sx={{ width: 120 }}>Subtotal</Stack>
          <Stack sx={{ width: 36 }} />
          {wishlist && <Stack sx={{ width: 36 }} />}
        </Stack>

        {carts.length > 0 ? carts?.map((cart) => (
          <EcommerceCartItem key={cart.id} cart={cart as CartItemProps} wishlist={wishlist} />
        )) : <p>Nothing...</p> }
      </Scrollbar>
  );
}
