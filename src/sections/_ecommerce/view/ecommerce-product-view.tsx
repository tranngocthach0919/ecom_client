'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

// import { _products } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { SplashScreen } from 'src/components/loading-screen';

import { IProductItemProps } from 'src/types/product';
import EcommerceProductDetailsCarousel from '../product/details/ecommerce-product-details-carousel';
import EcommerceProductDetailsDescription from '../product/details/ecommerce-product-details-description';
import EcommerceProductDetailsInfo from '../product/details/ecommerce-product-details-info';

// ----------------------------------------------------------------------

// const _mockProduct = _products[0];

export default function EcommerceProductView({ product }: { product: IProductItemProps }) {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }
  console.log(product);
  

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
            },
            {
              name: product.category.name,
            },
            {
              name: product.name,
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={product.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              id={product.id}
              name={product.name}
              price={product.price}
              caption={product.caption}
              priceSale={product.salePrice}
              ratingNumber={product.ratingNumber}
              totalReviews={product.totalReviews}
              colors={product.colors}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={product.description}
              specifications={[
                { label: 'Gender', value: product.gender as string },
                { label: 'Category', value: product.category.name },
                // { label: 'Warranty', value: '12 Months' },
                // { label: 'Manufacturer', value: 'Apple' },
                // { label: 'Serial number', value: '3123123213312' },
                // { label: 'Ships From', value: 'United States' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
