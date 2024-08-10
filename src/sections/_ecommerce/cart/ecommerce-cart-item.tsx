"use client"

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

import { CartItemProps } from 'src/types/cart';
// import { Input } from '@mui/material';
import { useContext, useState } from 'react';
import { CartContext, CartTriggerContext } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

type Props = {
  wishlist: boolean;
  cart: CartItemProps;
};

export default function EcommerceCartItem({ cart, wishlist }: Props) {
  const { updateCartItem, deleteCartItem } = useContext(CartContext);
  const { setTrigger }: any = useContext(CartTriggerContext);
  
  const [quantity, setQuantity] = useState<number>(cart.quantity);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      try {
        const updateData = {
          id: cart.id,
          productId: cart.product.id as string,
          quantity: newQuantity,
          attribute: cart.attribute,
          product: {
            id: cart.product.id as string
          }
        };
        updateCartItem({...updateData});
        setQuantity(newQuantity);
        setTrigger(Math.random())        
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      deleteCartItem(cart.id);
      setTrigger(Math.random())
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={cart.product.images?.[0]}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
        />

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{cart.product.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {/* {cart.colors} */}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 50, marginRight: 9 }}>
        <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
          defaultValue={quantity}
          onChange={handleChangeQuantity}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <Stack sx={{ width: 120, typography: 'subtitle2' }}> {fCurrency((Number(cart.product.salePrice)*quantity))} </Stack  >

      <IconButton onClick={handleRemoveCartItem}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}
    </Stack>
  );
}
