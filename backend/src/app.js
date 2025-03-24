"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
    },
};
const init = async () => {
    try {
        await server_1.default.register([
            inert_1.default,
            vision_1.default,
            {
                plugin: hapi_swagger_1.default,
                options: swaggerOptions
            }
        ]);
        await server_1.default.start();
        console.log('Server running on %s', server_1.default.info.uri);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
init();
