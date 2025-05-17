import { WebSocketServer } from 'ws';

let wss: WebSocketServer;

export const initWebSocket = (server: any) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('🔗 Websocket client connected');
  });
};

export const notifyClients = (message: any) => {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
};
