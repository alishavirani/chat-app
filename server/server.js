const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connnected');

  socket.emit('newMessage', {
    from: 'Mike',
    text: 'Hey how are you..',
    createdAt: 123
  });

  socket.on('createMessage', (msg) => {
    console.log('Create message', msg);
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
