// index.js
import express from 'express';
import router from './Route.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Adicione isso
app.use('/', router);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});