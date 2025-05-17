import { createServer } from 'http';
import app from './app';
import { config } from './shared/config/config';
import { initWebSocket } from './shared/services/websocket.service';
import { redisClient } from './shared/database/redis';
import { db } from './shared/database/mysql';

// Server
const server = createServer(app);

// WebSocket Server
initWebSocket(server);

// Port
const port = config.port;

const start = async () => {
  try {
    // Redis
    await redisClient.connect();

    // MySQL
    await db.getConnection();
    console.log('✅ MySQL connected');

    // Start server + WebSocket
    server.listen(port, () => {
      console.log(`✅ Server running on port: ${port}`);
      console.log(`✅ WebSocket Server running`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();

