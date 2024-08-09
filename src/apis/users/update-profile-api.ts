import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API}/profile`;

export const updateProfile = async (data: any) => {
  try {
    const token = localStorage.getItem('token');
    console.log('data', data);
    const response = await axios.patch(
      API_URL,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthday: data.birthday,
        gender: data.gender,
        address: data.address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('reposne ben API', response);

    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
