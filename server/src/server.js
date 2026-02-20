import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { env } from './config/env.js';
import { connectDb } from './config/db.js';
import { registerTourSocket } from './sockets/tourSocket.js';

const start = async () => {
  await connectDb();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: env.clientUrl, credentials: true }
  });

  registerTourSocket(io);

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${env.port}`);
  });
};

start();
