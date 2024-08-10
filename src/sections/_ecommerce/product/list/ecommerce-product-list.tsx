import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { IProductItemProps } from 'src/types/product';

import { useContext, useEffect } from 'react';
import FilterContext from 'src/contexts/filter-context';
import { defaultValues } from '../filters/ecommerce-filters';
import EcommerceProductViewGridItem from '../item/ecommerce-product-view-grid-item';
import EcommerceProductViewGridItemSkeleton from '../item/ecommerce-product-view-grid-item-skeleton';
import EcommerceProductViewListItem from '../item/ecommerce-product-view-list-item';
import EcommerceProductViewListItemSkeleton from '../item/ecommerce-product-view-list-item-skeleton';

// ----------------------------------------------------------------------

type Props = {
  products: IProductItemProps[];
  viewMode: string;
  loading?: boolean;
};

export default function EcommerceProductList({ loading, viewMode, products }: Props) {
  const filterContextValue = useContext(FilterContext); 
  const filters = filterContextValue ? filterContextValue.filters : defaultValues;
  

  const filteredProducts = products.filter((product) => {
    return (
      (filters.filterCategories === '' || product.category.name === filters.filterCategories) 
      &&
      (filters.filterBrand === '' || (product.brand.name === filters.filterBrand)) 
      && 
      (product.price >= filters.filterPrice.start && product.price <= filters.filterPrice.end) 
      &&
      (!filters.filterStock || product.quantity > 0) 
    );
  });
  console.log(filters);
  

  useEffect(() => {}, [filters, filteredProducts])
  
  return (
    <>
      {viewMode === 'grid' ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
        >
          {(loading ? [...Array(16)] : filteredProducts).map((product, index) =>
            product ? (
              <EcommerceProductViewGridItem key={product.id} product={product} />
            ) : (
              <EcommerceProductViewGridItemSkeleton key={index} />
            )
          )}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(16)] : filteredProducts).map((product, index) =>
            product ? (
              <EcommerceProductViewListItem key={product.id} product={product} />
            ) : (
              <EcommerceProductViewListItemSkeleton key={index} />
            )
          )}
        </Stack>
      )}

      <Pagination
        count={10}
        color="primary"
        sx={{
          mt: 10,
          mb: 5,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
