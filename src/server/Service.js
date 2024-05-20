// Service.js
import axios from 'axios';

export async function submitForm(data) {
    try {
        const response = await axios.post('http://localhost:3000/form', data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}