import { useMutation, useQueryClient } from '@tanstack/react-query';
// your API call to add an order


import axios from 'axios';

// Replace with your real backend endpoint
const API_URL = 'http://localhost:8080/api/orders';

// Add order function
export const addOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data; // Return the created order data
  } catch (error) {
    console.error('Error adding order:', error);
    throw error.response?.data || error;
  }
};


// Custom hook for orders
const AddOrder = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      // Update the 'orders' query cache
      queryClient.setQueryData(['orders'], (oldData) => {
        console.log(JSON.stringify(data)+"!!!!!!!!!!!!!");
        console.log(JSON.stringify(oldData));
        return oldData ? [...oldData, data] : [data];
      });
    },
    ...options, // allow onError, onSettled, etc.
  });
};


export default AddOrder;