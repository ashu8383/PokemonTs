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
const genarates_token_1 = __importDefault(require("../../utils/genarates_token"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModal_1 = __importDefault(require("../../model/UserModal"));
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const isExist = yield UserModal_1.default.findOne({ email: user.email.toLowerCase() });
        if (isExist) {
            return res.status(401).json({ error: "User already exists" });
        }
        if (user.password && user.name && user.email) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const newPassword = yield bcrypt_1.default.hash(user.password, salt);
            const userToCreate = yield UserModal_1.default.create(Object.assign(Object.assign({}, user), { password: newPassword, id: new Date().getTime().toString() }));
            const token = (0, genarates_token_1.default)(userToCreate.id);
            // @ts-ignore
            delete userToCreate.password;
            return res.status(201).json({
                _id: userToCreate._id,
                username: userToCreate.name,
                email: userToCreate.email,
                token,
            });
        }
        else {
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.default = registration;
