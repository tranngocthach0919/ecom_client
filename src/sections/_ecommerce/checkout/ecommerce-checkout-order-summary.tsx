import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { IProductItemProps } from 'src/types/product';
import { CartItemProps } from 'src/types/cart';
import { useContext, useState } from 'react';
import { CartContext, CartTriggerContext } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

type Props = {
  total: number;
  subtotal?: number;
  shipping: number;
  discount: number;
  carts: CartItemProps[];
  loading?: boolean;
};

export default function EcommerceCheckoutOrderSummary({
  total,
  // subtotal,
  shipping,
  discount,
  carts,
  loading,
}: Props) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!carts?.length && (
        <>
          {carts.map((cart) => (
            <ProductItem key={cart.id} cart={cart} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(total)} />

        <Row label="Shipping" value={fCurrency(total ? shipping : 0)} />

        <Row label="Discount (15%)" value={`-${fCurrency(total ? discount : 0)}`} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
      >
        Order Now
      </LoadingButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type ProductItemProps = StackProps & {
  cart: CartItemProps;
};

function ProductItem({ cart, ...other }: ProductItemProps) {
  const { updateCartItem, deleteCartItem } = useContext(CartContext);
  
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
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      deleteCartItem(cart.id);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={cart.product.images?.[0]}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {cart.product.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(Number(cart.product.salePrice)*quantity)}
        </Typography>

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

      <IconButton onClick={handleRemoveCartItem}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = StackProps & {
  label: string;
  value: string;
};

function Row({ label, value, sx, ...other }: RowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}
