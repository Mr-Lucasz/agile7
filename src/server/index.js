import express from 'express';
import cors from 'cors';
import formRoutes from './Route.js';
import { run } from './Database.js';

const app = express();
const port = process.env.PORT || 3000; // Use a porta do ambiente ou 3000 como fallback

app.use(cors({
  origin: 'https://agile7tech.com.br' // Substitua com seu domínio de produção
}));
app.use(express.json());
app.use('/form', formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

run().catch(console.dir);