import express from "express";
import allPokempon from "../../Controller/PokemonController/v3/allPokempon";
import { authMiddleware } from "../../middleware/authmiddleware";
import getAllPokemonType from "../../Controller/PokemonController/v3/getAllPokemonType";

const v3pokemonRoutes = express.Router();

v3pokemonRoutes.get("/getallPokemon", authMiddleware, allPokempon);
v3pokemonRoutes.get("/getallPokemonType", authMiddleware, getAllPokemonType);

export default v3pokemonRoutes;
