import express from 'express';
import { createServer } from 'http';

// Server
const app = express();
const server = createServer(app);

// Port
const port = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
  res.send("hello world");
});

server.listen(() => {
  console.log(`Server corriendo en puerto: ${port}`);
});
