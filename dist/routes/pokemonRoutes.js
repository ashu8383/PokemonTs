"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allPokempon_1 = __importDefault(require("../Controller/PokemonController/allPokempon"));
const authmiddleware_1 = require("../middleware/authmiddleware");
const pokemonRoutes = express_1.default.Router();
pokemonRoutes.get("/getallPokemon", authmiddleware_1.authMiddleware, allPokempon_1.default);
exports.default = pokemonRoutes;
