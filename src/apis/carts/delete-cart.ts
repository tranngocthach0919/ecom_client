import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/carts`;

export const deleteCart = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response.data.data;
    } catch (error) {
        console.error('Error delete cart:', error);
        throw error;
    }
};
