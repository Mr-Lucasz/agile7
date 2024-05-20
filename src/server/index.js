import express from 'express';
import cors from 'cors';
import formRoutes from './Route.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});