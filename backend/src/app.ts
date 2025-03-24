import * as Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import HapiPino from 'hapi-pino';
import { RegisterRoutes } from './routes';
import 'dotenv/config';

const app = async (): Promise<Hapi.Server> => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    })
    await server.register(Inert);
    await server.register({
        plugin: HapiPino,
    });
    RegisterRoutes(server);
    return server;
}

export default app;