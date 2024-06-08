import { Request, Response } from 'express';
import axios from 'axios';
import { Pokemon } from '../models/pokemon';
import { getCache, setCache } from '../services/cache';

const getPokemonFromApi = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const { id, moves, types } = response.data;
  const pokemonData = {
    id,
    name,
    moves: moves.slice(0, 4).map((move: any) => move.move.name),
    types: types.map((type: any) => type.type.name),
  };
  return pokemonData;
};

const addPokemon = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    // Check cache
    const cacheData = getCache(name);
    let pokemonData;
    if (cacheData) {
      pokemonData = JSON.parse(cacheData);
    } else {
      pokemonData = await getPokemonFromApi(name);
      setCache(name, JSON.stringify(pokemonData), 3600); // Cache for 1 hour
    }

    const newPokemon = new Pokemon(pokemonData);
    await newPokemon.save();
    res.status(201).send(newPokemon);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add Pokémon' });
  }
};

const deletePokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Pokemon.findOneAndDelete({ id: Number(id) });
    if (result) {
      res.status(200).send({ message: 'Pokémon deleted successfully' });
    } else {
      res.status(404).send({ error: 'Pokémon not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete Pokémon' });
  }
};

const deletePokemonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const result = await Pokemon.findOneAndDelete({ name });
    if (result) {
      res.status(200).send({ message: 'Pokémon deleted successfully' });
    } else {
      res.status(404).send({ error: 'Pokémon not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete Pokémon' });
  }
};

const listPokemons = async (_req: Request, res: Response) => {
  try {
    const pokemons = await Pokemon.find();
    res.status(200).send(pokemons);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve Pokémon list' });
  }
};

const deletePokemonByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const result = await Pokemon.deleteMany({ types: type });
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `${result.deletedCount} Pokémon deleted successfully` });
    } else {
      res.status(404).send({ error: 'No Pokémon found for the given type' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete Pokémon by type' });
  }
};

export { addPokemon, deletePokemonById, deletePokemonByName, listPokemons, deletePokemonByType };
