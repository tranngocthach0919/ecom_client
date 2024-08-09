import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/register`;

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(API_URL, data);

    return response.data.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
