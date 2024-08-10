import axios from 'axios';
import { MakeOrderBody } from 'src/types/order';

const API_URL = `${process.env.NEXT_PUBLIC_API}/carts/make-order`;

export const MakeOrder = async (order: MakeOrderBody) => {
    try {
        console.log(order);
        
        const token = localStorage.getItem('token');
        const response = await axios.post(API_URL, order, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                window.location.href = '/login'
                return;
            }
        }

        console.error('Error make order:', error);
        throw error;
    }
};
