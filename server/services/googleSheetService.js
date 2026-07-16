import axios from "axios";

export const addToGoogleSheet = async (data) => {
  try {
    const response = await axios.post(
      process.env.GOOGLE_SCRIPT_URL,
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Google Sheet Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};
