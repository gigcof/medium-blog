"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signInObject = exports.signUpObject = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpObject = zod_1.default.object({
    name: zod_1.default.string().max(10),
    password: zod_1.default.string().min(6),
    email: zod_1.default.string().email(),
});
exports.signInObject = zod_1.default.object({
    password: zod_1.default.string().min(6),
    email: zod_1.default.string().email(),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().max(100),
    content: zod_1.default.string().max(1000),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string().max(100),
    content: zod_1.default.string().max(1000),
});
