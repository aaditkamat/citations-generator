import app from './app';

app().then(
    (server) => server.start()
).catch((err) => {
    console.error(err);
    process.exit(1);
});