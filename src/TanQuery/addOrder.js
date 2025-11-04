import axios from "axios";



const API_URL = 'http://localhost:8080/api/orders';

export const addOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data; // Return the created order data
  } catch (error) {
    console.error('Error adding order:', error);
    throw error.response?.data || error;
  }
};


export const putOrder= async ({id,putChange}) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/orders/${id}`, putChange);
    return response.data; // Return the created order data
  } catch (error) {
    console.error('Error adding order:', error);
    throw error.response?.data || error;
  }
};