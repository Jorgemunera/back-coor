import { createServer } from 'http';
import app from './app';
import { config } from './shared/config/config';

// Server
const server = createServer(app);

// Port
const port = config.port;

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`🏃🏻Server corriendo en puerto: ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

start();

