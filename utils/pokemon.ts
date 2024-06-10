import fs from "fs";

export const pokemontData = JSON.parse(
  fs.readFileSync("./pokedex.json", "utf-8")
);
export const pokemonType = JSON.parse(fs.readFileSync("./types.json", "utf-8"));
