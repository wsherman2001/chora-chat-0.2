import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3003;
const messages = [];

io.on('connection', socket => {
  console.log('🟢 connected', socket.id);
  socket.emit('load messages', messages);

  socket.on('chat message', ({ nickname, text }) => {
    const msg = {
      nickname,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    messages.push(msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => console.log('🔴 left', socket.id));
});

server.listen(PORT, () => console.log(`✅ Socket server on :${PORT}`));