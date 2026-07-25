import axios from "axios";

const getApiBaseUrl = () => {
  return (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? "https://apj-institute-website-jleq.onrender.com/api"
      : "http://localhost:5000/api")
  );
};

export const submitContactInquiry = async (payload) => {
  const baseUrl = getApiBaseUrl();
  const response = await axios.post(`${baseUrl}/contact`, payload);
  return response.data;
};