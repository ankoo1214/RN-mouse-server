const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs')
const path = require('path');

 
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Mobile device connected');

  socket.on('moveMouse', (data) => {
      robot.moveMouse(data.x, data.y);
  });


  socket.on('click', () => {
    robot.mouseClick();
  });
 
  socket.on('leftClick', () => {
    robot.mouseClick('left');
    
  });
  
  socket.on('rightClick', () => {
    robot.mouseClick('right');
   
  });

  socket.on('type', (text) => {
    robot.typeString(text);
  });

  socket.on('scroll', (data) => {
    robot.scrollMouse(data.scrollX, data.scrollY);
  });

  socket.on('disconnect', () => {
    console.log('Mobile device disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
