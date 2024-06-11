import { Response, Request } from "express";
import { pokemontData } from "../../../utils/pokemon";

const first_12_pokemon = async (req: Request, res: Response) => {
  try {
    const page: number = req.query.page
      ? parseInt(req.query.page as string)
      : 1;
    const per_page: number = req.query.per_page
      ? parseInt(req.query.per_page as string)
      : 12;
    const q: string | undefined = req.body.q as string | undefined;

    let nextLink: string | null = null;
    let data: any;
    let total = 0;

    if (q) {
      let tempData = pokemontData.filter((d: any) =>
        d.name.english.toLowerCase().includes(q.toLowerCase())
      );

      data = tempData.slice((page - 1) * per_page, page * per_page);
      total = tempData.length;

      if (total > page * per_page) {
        nextLink = `http://${req.hostname}:${
          process.env.PORT || 8282
        }/api/v1/pokemon/first_twelve_pokemon?page=${page + 1}&q=${q}`;
      }
    } else {
      total = pokemontData.length;
      data = pokemontData.slice((page - 1) * per_page, page * per_page);

      if (total > page * per_page) {
        nextLink = `http://${req.hostname}:${
          process.env.PORT || 8282
        }/api/v1/pokemon/first_twelve_pokemon?page=${
          page + 1
        }&per_page=${per_page}`;
      }
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

export default first_12_pokemon;
