import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/profile`;

export const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
