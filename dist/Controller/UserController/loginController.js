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
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModal_1 = __importDefault(require("../../model/UserModal"));
const genarates_token_1 = __importDefault(require("../../utils/genarates_token"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModal_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email" });
        }
        const isPasswordCorrect = password && (yield bcrypt_1.default.compare(password, user.password));
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        if (email && password) {
            const userWithToken = user.toObject();
            userWithToken.token = (0, genarates_token_1.default)(user.id);
            // @ts-ignore
            delete userWithToken.password;
            return res.json(userWithToken);
        }
        else {
            return res.status(401).json({ error: "Please add all details" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.default = loginController;
