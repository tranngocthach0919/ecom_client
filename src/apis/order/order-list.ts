import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/orders`;

export const fetchOrders = async ({ page, limit }: { page: string, limit: string }) => {

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) { 
        throw error;
      }
    }

    console.error('Error fetching order:', error);
    throw error;
  }
};
