import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

export async function submitForm(data) {
  try {
    const response = await axios.post(`${apiUrl}/form`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}