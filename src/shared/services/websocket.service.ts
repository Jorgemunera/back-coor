import { WebSocketServer } from 'ws';
import { WebSocketMessage } from '../types/websocketMessage';

let wss: WebSocketServer;

export const initWebSocket = (server: any) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('🔗 Websocket client connected');
  });
};

export const notifyClients = (message: WebSocketMessage) => {
  if (!wss) return;


  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      try {
        client.send(JSON.stringify(message));
      } catch (error) {
        console.error('❌ Error sending message to client:', error);
      }
    }
  });
};
