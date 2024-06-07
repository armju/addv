import { Router } from 'express';
import { addPokemon, deletePokemonById, deletePokemonByName, listPokemons, deletePokemonByType } from '../controllers/pokemonController';

const router = Router();

router.post('/pokemon/:name', addPokemon);
router.delete('/pokemon/id/:id', deletePokemonById);
router.delete('/pokemon/name/:name', deletePokemonByName);
router.delete('/pokemon/type/:type', deletePokemonByType);
router.get('/pokemons', listPokemons);

export default router;
