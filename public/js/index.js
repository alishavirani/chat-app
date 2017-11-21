var socket  = io();

socket.on('connect', function () {
  console.log('Connnected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('New Message', msg);
});
