import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from 'src/contexts/cart-context';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  tax: number;
  // total: number;
  // subtotal: number;
  shipping: number;
  discount: number;
};

export default function EcommerceCartSummary({ tax = 0, shipping = 55.47, discount = 16.17 }: Props) {
  const { cartItems } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems?.reduce(
      (acc, cart) =>
        acc + parseFloat(cart.product.salePrice as string) * cart.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Summary </Typography>

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(total)} />

        <Row label="Shipping" value={fCurrency(total ? shipping : 0)} />
        
        <Row label="Discount" value={fCurrency(total ? discount: 0)} />
      </Stack>

      {/* <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      /> */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total ? total + shipping - discount : 0)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <Button
        component={RouterLink}
        href={paths.eCommerce.checkout}
        size="large"
        variant="contained"
        color="inherit"
        disabled={cartItems.length === 0}
      >
        Checkout
      </Button>
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
