// api/websocket.js
import { Server } from 'ws';

export default (req, res) => {
  // Configura o WebSocket server
  const wss = new Server({ noServer: true });

  wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');
    
    ws.on('message', (message) => {
      console.log('Mensagem recebida:', message);

      // Envia a mensagem para todos os outros clientes
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });

  // A parte abaixo garante que o Vercel vai lidar com o WebSocket corretamente
  req.socket.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  res.status(200).send('WebSocket server is running');
};
