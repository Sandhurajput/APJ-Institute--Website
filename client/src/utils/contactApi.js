import axios from 'axios';

const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

export const submitContactInquiry = async (payload) => {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await axios.post(`${baseUrl}/contact`, payload);
    return response.data;
  } catch (error) {
    if (!import.meta.env.VITE_API_URL && baseUrl.includes('5000')) {
      const fallbackResponse = await axios.post('http://localhost:5001/api/contact', payload);
      return fallbackResponse.data;
    }

    throw error;
  }
};