import * as http from 'http';
import app from './app';
import {} from 'dotenv/config';
import { dbInit, dbClose } from './repository/mysql/mysql';

const PORT = process.env.PORT || 8000;
const serverAddress = `${process.env.SERVER_ADDRESS}:${PORT}`;
const server = http.createServer(app);

let serverIsClosing = false; // Flag to track if the server is in the process of shutting down

async function startServer() {
    await dbInit();
    server.listen(PORT, () => {
        console.log(`\nListening on PORT ${PORT}... @ ${serverAddress}`);
        console.log(`\nDB connected @ ${process.env.DB_HOST}:${process.env.DB_PORT} DbName: ${process.env.DB_NAME}`);
        console.log(`\nGood to go!`);
    });

    // Handle termination signals
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
}

async function gracefulShutdown() {
    if (serverIsClosing) return; // If already in the process of shutting down, exit early

    serverIsClosing = true;

    console.log('\nReceived shutdown signal. Closing server...');

    // Close the server to stop accepting new connections
    server.close(async () => {
        console.log('Server closed. Closing database connections...');

        // Close the database connection
        await dbClose();

        console.log('Database connections closed. Exiting process.');
        process.exit(0); // Exit the Node.js process
    });

    // If the server doesn't close within a timeout, forcefully close it
    setTimeout(() => {
        console.error('Could not close server in time. Forcing shutdown...');
        process.exit(1);
    }, 5000); // 5 seconds timeout
}

startServer();