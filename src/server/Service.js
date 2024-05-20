// Service.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.URL_MAIN;

export async function submitForm(data) {
    try {
        const response = await axios.post(`${url}/form`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}