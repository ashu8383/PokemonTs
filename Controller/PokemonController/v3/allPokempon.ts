import { Response, Request } from "express";
import { pokemontData } from "../../../utils/pokemon";
import capitalize from "../../../utils/Capilatize";

const allPokemon = async (req: Request, res: Response) => {
  try {
    const page: number = req.query.page
      ? parseInt(req.query.page as string)
      : 1;
    const per_page: number = req.query.per_page
      ? parseInt(req.query.per_page as string)
      : 12;
    const q: string | undefined = req.body.q as string | undefined;
    let type: any = req.body.type && capitalize(req.body.type as string);
    let nextLink: string | null = null;
    let data: any;
    let total = 0;

    if (q) {
      console.log(q);
      data = pokemontData.filter((d: any) =>
        d.name.english.toLowerCase().includes(q.toLowerCase())
      );
    } else {
      data = pokemontData;
    }
    if (type) {
      console.log(type);
      data = pokemontData.filter((d: any) => d.type.includes(type));
    }

    total = data.length;
    data = data.slice((page - 1) * per_page, page * per_page);
    if (total > page * per_page) {
      nextLink = `http://${req.hostname}:${
        process.env.PORT || 8282
      }/api/v3/pokemon/getallPokemon?page=${page + 1}&q=${q}`;
    }
    res.json({
      total,
      data,
      next: nextLink,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default allPokemon;
