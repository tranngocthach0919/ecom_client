// import axios from 'axios';

// const API_URL = `${process.env.NEXT_PUBLIC_API}/carts`;

// export const fetchCarts = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     throw error;
//   }
// };
import axios from 'axios';


const API_URL = `${process.env.NEXT_PUBLIC_API}/carts`;

export const fetchCarts = async () => {

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
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

    console.error('Error fetching cart:', error);
    throw error;
  }
};
