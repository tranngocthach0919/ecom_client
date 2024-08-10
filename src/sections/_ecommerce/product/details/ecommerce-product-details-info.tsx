import { useCallback, useContext, useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

import { CartContext, CartContextItemProps } from 'src/contexts/cart-context';
import ProductColorPicker from '../../common/product-color-picker';
import ProductPrice from '../../common/product-price';
import { fetchCarts } from 'src/apis/carts/cart-list-api';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

// const COLOR_OPTIONS = [
//   { label: '#000000', value: 'black' }, // Black
//   { label: '#0000FF', value: 'blue' }, // Blue
//   { label: '#FF0000', value: 'red' }, // Red
//   { label: '#008000', value: 'green' }, // Green
//   { label: '#e0e0e0', value: 'silver' }, // Silver
//   { label: '#A52A2A', value: 'brown' }, // Brown
//   { label: '#FFD700', value: 'gold' }, // Gold
// ];

// const MEMORY_OPTIONS = [
//   { label: '128GB', value: '128gb' },
//   { label: '256GB', value: '256gb' },
//   { label: '512GB', value: '512gb' },
//   { label: '1TB', value: '1tb' },
// ];

// ----------------------------------------------------------------------

type Props = {
  id: string;
  name: string;
  price: number;
  ratingNumber: number;
  totalReviews: number;
  priceSale: number;
  caption: string;
  colors: string;
};

export default function EcommerceProductDetailsInfo({
  id,
  name,
  price,
  ratingNumber,
  totalReviews,
  priceSale,
  caption,
  colors
}: Props) {
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [memory, setMemory] = useState('128gb');
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { dispatch, addToCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      const addCartData = {
        quantity: quantity,
        product: { id: id }
        // attribute: color, 
      };

      addToCart(addCartData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setOpen(true);
      }
    }
  };


  const handleChangeColor = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // setColor((event.target as HTMLInputElement).value);
  }, []);

  const handleChangeMemory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMemory((event.target as HTMLInputElement).value);
  }, []);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          Bạn cần phải đăng nhập để thêm vào giỏ hàng <Button onClick={() => router.push('/login')}>Đăng nhập</Button>
        </Alert>
      </Snackbar>
      <Label color="success" sx={{ mb: 3 }}>
        In Stock
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={ratingNumber} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({totalReviews} reviews)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice price={price} salePrice={priceSale} sx={{ typography: 'h5' }} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Color</Typography>
          <ProductColorPicker value={colors} onChange={handleChangeColor} option={colors} />
        </Stack>

        {/* <Stack spacing={2}>
          <Typography variant="subtitle2">Memory</Typography>
          <ProductOptionPicker
            value={memory}
            onChange={handleChangeMemory}
            options={MEMORY_OPTIONS}
          />
        </Stack> */}
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }}>
        <TextField
          select
          hiddenLabel
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
          onChange={(e: any) => setQuantity(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />
    </>
  );
}
