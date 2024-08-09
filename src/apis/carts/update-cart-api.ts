import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/carts`;

export const updateCartQty = async ({ productId, quantity, attribute = "" }:
    { productId: string, quantity: number | string, attribute?: string }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.patch(API_URL, [{ productId, quantity, attribute }], {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response.data.data;
    } catch (error) {
        console.error('Error update quantity cart:', error);
        throw error;
    }
};
