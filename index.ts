import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

import connect from "./config/db";
import pokemonRoutes from "./routes/v3/v3pokemonRoutes";
import v1pokemonRoutes from "./routes/v1/v1pokemonRoutes";
import v3pokemonRoutes from "./routes/v3/v3pokemonRoutes";
import userRouter from "./routes/user/userRoutes";

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.Port;

connect()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("monodb connection error: " + err);
  });

app.use("/api/check", (req: Request, res: Response) => {
  res.send("App is running");
});

app.use("/api/user", userRouter);
app.use("/api/v1/pokemon", v1pokemonRoutes);
app.use("/api/v3/pokemon", v3pokemonRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
