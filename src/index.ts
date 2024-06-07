import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import pokemonRoutes from './routes/pokemonRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('combined'));

mongoose.connect(process.env.MONGO_URI as string, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api', pokemonRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
