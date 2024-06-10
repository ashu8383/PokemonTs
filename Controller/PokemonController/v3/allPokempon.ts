import { Response, Request } from "express";
import { pokemontData } from "../../../utils/pokemon";
import capitalize from "../../../utils/Capilatize";

const allPokemon = async (req: Request, res: Response) => {
  try {
    const page: number = req.query.page
      ? parseInt(req.query.page as string)
      : 1;
    const q: string | undefined = req.body.q as string | undefined;
    const per_page: number = req.body.per_page
      ? parseInt(req.query.per_page as string)
      : 48;
    const type: string | undefined = req.body.type
      ? capitalize(req.body.type as string)
      : undefined;

    let nextLink: string | null = null;
    let data: typeof pokemontData = [];
    let total = 0;

    if (q) {
      const filteredData = pokemontData.filter((d: any) =>
        d.name.english.toLowerCase().includes(q.toLowerCase())
      );
      data = filteredData;
      res.json({
        data,
      });
    } else {
      data = pokemontData;
    }

    if (type) {
      const pokemon_type = data.filter((d: any) => d.type.includes(type));
      res.json({
        pokemon_type,
      });
    }

    total = data.length;
    data = pokemontData.slice((page - 1) * per_page, page * per_page);

    if (total > page * per_page) {
      nextLink = `http://${req.hostname}:${
        process.env.PORT || 8282
      }/api/v3/pokemon/getallPokemon?page=${page + 1}&per_page=${per_page}`;
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

// import { Response, Request } from "express";
// import { pokemontData } from "../../utils/pokemon";
// import capitalize from "../../utils/Capilatize";

// const allPokemon = async (req: Request, res: Response) => {
//   try {
//     const page: number = req.query.page
//       ? parseInt(req.query.page as string)
//       : 1;
//     const q: string | undefined = req.query.q as string | undefined;
//     const per_page: number = req.query.per_page
//       ? parseInt(req.query.per_page as string)
//       : 48;
//     const type: string | undefined = req.query.type
//       ? capitalize(req.query.type as string)
//       : undefined;

//     let nextLink: string | null = null;
//     let data: typeof pokemontData = [];
//     let total = 0;

//     // Filter by name if query 'q' is provided
//     if (q) {
//       data = pokemontData.filter((d: any) =>
//         d.name.english.toLowerCase().includes(q.toLowerCase())
//       );
//     } else {
//       data = pokemontData;
//     }

//     // Further filter by type if query 'type' is provided
//     if (type) {
//       data = data.filter((d: any) => d.type.includes(type));
//     }

//     total = data.length;
//     // Slice the filtered data for pagination
//     data = data.slice((page - 1) * per_page, page * per_page);

//     if (total > page * per_page) {
//       nextLink = `http://${req.hostname}:${
//         process.env.PORT || 8282
//       }/api/v3/pokemon/getallPokemon?page=${page + 1}&per_page=${per_page}`;
//     }

//     res.json({
//       total,
//       data,
//       next: nextLink,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export default allPokemon;
