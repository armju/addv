import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import pokemonRoutes from '../routes/pokemonRoutes';

const app = express();
app.use(express.json());
app.use('/api', pokemonRoutes);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Pokemon API', () => {
  it('should add a new Pokemon', async () => {
    const res = await request(app).post('/api/pokemon/pikachu');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'pikachu');
  });

  it('should list all Pokemon', async () => {
    const res = await request(app).get('/api/pokemons');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should delete a Pokemon by name', async () => {
    const res = await request(app).delete('/api/pokemon/name/pikachu');
    expect(res.status).toBe(200);
  });

  it('should delete a Pokemon by type', async () => {
    await request(app).post('/api/pokemon/pikachu');
    const res = await request(app).delete('/api/pokemon/type/electric');
    expect(res.status).toBe(200);
  });
});
