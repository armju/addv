import { Schema, model, Document } from 'mongoose';

interface IPokemon extends Document {
  id: number;
  name: string;
  moves: string[];
  types: string[];
}

const PokemonSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  moves: { type: [String], required: true },
  types: { type: [String], required: true },
});

const Pokemon = model<IPokemon>('Pokemon', PokemonSchema);

export { Pokemon, IPokemon };
