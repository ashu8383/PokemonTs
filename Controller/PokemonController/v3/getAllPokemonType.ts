import { Response, Request } from "express";
import { pokemonType } from "../../../utils/pokemon";

const convertData = (type: any) => ({
  label: type.english,
  value: type.english.toLowerCase(),
});

const getAllPokemonType = async (req: Request, res: Response) => {
  const convertedData = pokemonType.map((type: string) => convertData(type));

  try {
    res.json(convertedData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export default getAllPokemonType;
