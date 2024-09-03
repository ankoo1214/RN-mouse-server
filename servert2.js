const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
 
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Device connected');

  // Join a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Device joined room ${roomId}`);
  });
 
  socket.on('moveMouse', (data) => {
    const { roomId, x, y } = data;
    console.log('data', data)
    io.to(roomId).emit('moveMouse', { x, y });
  });

  socket.on('leftClick', (roomId) => {
    io.to(roomId).emit('leftClick');
  });

  socket.on('rightClick', (roomId) => {
    io.to(roomId).emit('rightClick');
  });

  socket.on('type', (data) => {
    const { roomId, text } = data;
    io.to(roomId).emit('type', text);
  });

  socket.on('scroll', (data) => {
    const { roomId, scrollX, scrollY } = data;
    io.to(roomId).emit('scroll', { scrollX, scrollY });
  });

  socket.on('disconnect', () => {
    console.log('Device disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
