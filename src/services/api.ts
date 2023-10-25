import axios from 'axios';

const BASE_URL = 'https://dummy-api-jtg6bessta-ey.a.run.app/';

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getQuestions`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getCategories`);
    return response;
  } catch (error) {
    throw error;
  }
};
