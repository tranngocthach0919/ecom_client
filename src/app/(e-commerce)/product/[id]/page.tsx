"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductDetail } from 'src/apis/products/product-detail-api';
import { useBoolean } from 'src/hooks/use-boolean';
import EcommerceProductView from 'src/sections/_ecommerce/view/ecommerce-product-view';
import { IProductItemProps } from 'src/types/product';

export default function EcommerceProductPage() {
  const [product, setProduct] = useState<IProductItemProps | null>(null); 
  const params = useParams();
  const loading = useBoolean(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productId = params.id; 
        if (productId) {
          const productData = await fetchProductDetail(productId as string); 
          setProduct(productData);
        } else {
          console.error('Product ID is missing');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        loading.onFalse();
      }
    };

    fetchProductData();
  }, [params.id]);   

  return (
    <>
      { product && <EcommerceProductView product={product} />}
    </>
  );
}
