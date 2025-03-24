"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
require("dotenv/config");
const server = hapi_1.default.server({
    port: process.env.PORT,
    host: 'localhost'
});
exports.default = server;
