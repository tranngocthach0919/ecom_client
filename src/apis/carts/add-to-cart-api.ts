import axios from 'axios';
import { AddToCartProps } from 'src/types/cart';

const API_URL = `${process.env.NEXT_PUBLIC_API}/carts`;

export const AddToCart = async (cart: AddToCartProps) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, cart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error add to cart:', error);
    throw error;
  }
};

// enqueSnackBar
