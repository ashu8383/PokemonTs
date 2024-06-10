"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize = (x) => {
    return x
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
};
exports.default = capitalize;
