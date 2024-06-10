"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_1 = require("../../utils/pokemon");
const Capilatize_1 = __importDefault(require("../../utils/Capilatize"));
const allPokemon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page
            ? parseInt(req.query.page)
            : 1;
        const q = req.query.q;
        const per_page = req.query.per_page
            ? parseInt(req.query.per_page)
            : 10;
        const type = req.query.type
            ? (0, Capilatize_1.default)(req.query.type)
            : undefined;
        let nextLink = null;
        let data = [];
        let total = 0;
        if (q) {
            data = pokemon_1.pokemontData.filter((d) => d.name.english.toLowerCase().includes(q.toLowerCase()));
        }
        else {
            data = pokemon_1.pokemontData;
        }
        if (type) {
            data = data.filter((d) => d.type.includes(type));
        }
        total = data.length;
        data = data.slice((page - 1) * per_page, page * per_page);
        if (total > page * per_page) {
            nextLink = `http://${req.hostname}:${process.env.PORT || 8282}/api/v1/pokemon/getallPokemon?page=${page + 1}&per_page=${per_page}&q=${q || ""}&type=${type || ""}`;
        }
        res.json({
            data,
            total,
            next: nextLink,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = allPokemon;
