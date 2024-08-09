import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/login`;

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(API_URL, data);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
