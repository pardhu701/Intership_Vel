import axios from "axios";
import { BASE_URL } from "./Api";



const API_URL = `${BASE_URL}/orders`;

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
    const response = await axios.put(`${BASE_URL}/orders/${id}`, putChange);
    return response.data; // Return the created order data
  } catch (error) {
    console.error('Error adding order:', error);
    throw error.response?.data || error;
  }
};