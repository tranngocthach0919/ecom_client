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

// ----------------------------------------------------------------------

type Props = {
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  products?: IProductItemProps[];
  loading?: boolean;
};

export default function EcommerceCheckoutOrderSummary({
  total,
  subtotal,
  shipping,
  discount,
  products,
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

      {!!products?.length && (
        <>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />

        <Row label="Shipping" value={fCurrency(shipping)} />

        <Row label="Discount (15%)" value={`-${fCurrency(discount)}`} />
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
  product: IProductItemProps;
};

function ProductItem({ product, ...other }: ProductItemProps) {
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={product.coverUrl}
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
          {product.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(product.price)}
        </Typography>

        <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <IconButton>
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
