import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Adicione mais rotas conforme necessário
import { insertFormData } from './Database.js';

router.post('/form', async (req, res) => {
    const data = req.body;
    await insertFormData(data);
    res.status(200).send('Data inserted successfully');
});


export default router;