import * as http from 'http';
import app from './app';
import {} from 'dotenv/config';

const PORT = process.env.PORT || 8000;
const serverAddress = `${process.env.SERVER_ADDRESS}:${PORT}`;
const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`\nListening on PORT ${PORT}... @ ${serverAddress}`);
        console.log(`\nDB connected @ ${process.env.DB_HOST}:${process.env.DB_PORT} DbName: ${process.env.DB_NAME}`);
        console.log(`\nGood to go!`);
    });
}

startServer();