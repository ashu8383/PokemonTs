"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const pokemonRoutes_1 = __importDefault(require("./routes/pokemonRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
const port = process.env.Port;
(0, db_1.default)()
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((err) => {
    console.log("monodb connection error: " + err);
});
app.use("/api/check", (req, res) => {
    res.send("App is running");
});
app.use("/api/user", userRoutes_1.default);
app.use("/api/v1/pokemon", pokemonRoutes_1.default);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
