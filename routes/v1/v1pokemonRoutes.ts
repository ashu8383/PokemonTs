import express from "express";
import first_12_pokemon from "../../Controller/PokemonController/v1/v1allPokemon";

const v1pokemonRoutes = express.Router();

v1pokemonRoutes.get("/first_twelve_Pokemon", first_12_pokemon);

export default v1pokemonRoutes;
