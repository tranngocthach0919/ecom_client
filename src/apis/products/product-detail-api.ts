import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/products`;

export const fetchProductDetail = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
};
