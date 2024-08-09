import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack, { StackProps } from '@mui/material/Stack';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { IProductItemProps } from 'src/types/product';

import ProductPrice from '../../common/product-price';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  product: IProductItemProps;
}

export default function EcommerceProductViewGridItem({ product, sx, ...other }: Props) {
  return (
    <Stack
      sx={{
        position: 'relative',
        '&:hover .add-to-cart': {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {/* {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          SALE
        </Label>
      )} */}

      <Box sx={{ position: 'relative', mb: 2 }}>
        <Fab
          component={RouterLink}
          href={`${paths.eCommerce.product}/${product.id}`}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={product?.images[0]}
          sx={{
            flexShrink: 0,
            borderRadius: 1.5,
            height: 160,
            bgcolor: 'background.neutral',
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
          {product.category?.name}
        </TextMaxLine>

        <Link component={RouterLink} href={`${paths.eCommerce.product}/${product.id}`} color="inherit">
          <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} salePrice={product.salePrice} />

        {/* <ProductRating ratingNumber={product.ratingNumber} label={`${product.sold} sold`} /> */}
      </Stack>
    </Stack>
  );
}
