import axios from "axios";

export const addToGoogleSheet = async (data) => {
  if (!process.env.GOOGLE_SCRIPT_URL) {
    throw new Error("GOOGLE_SCRIPT_URL is not configured");
  }

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
