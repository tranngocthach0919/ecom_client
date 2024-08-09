import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/categories`;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
