const express = require('express'),
  app = express(),
  server = require('http').createServer(app);
io = require('socket.io').listen(server);
sockets = new Set();

//This example emits to individual sockets (track by sockets Set above).
//Could also add sockets to a "room" as well using socket.join('roomId')
//https://socket.io/docs/server-api/#socket-join-room-callback

app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
  res.send('hello world');
});

var users = [];
var seenByUsers = [];

io.on('connection', socket => {

  socket.on('userInfo', data => {
    socket.name = data;
    sockets.add(socket);
    users.push(socket.name);
    usersInfo();
  });

  function usersInfo() {
    for (const s of sockets) {
      console.log(`User connected`);
      s.emit('usersInfo', users);
      console.log('Number of users ' + sockets.size)
    }
    console.log(`Socket ${socket.id}, ${socket.name} added`);
  }


  socket.on('userMessage', data => {
    //new message seen by none
    seenByUsers = [];

    console.log(`Emitting message: [${data.userName}]: ${data.message}`);
    console.log(`Empty seen by`);
    for (const s of sockets) {
      s.emit('userMessage', data);
      s.emit('seenByUsers', seenByUsers);
    }
  });


  socket.on('seenByUsers', data => {
    seenByUsers.push(data);
    console.log(`Added seen by ${data}`);
    for (const s of sockets) {
      s.emit('seenByUsers', seenByUsers);
    }
  })

  socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id} ${socket.name}`);

    users = users.filter(u => u != socket.name);
    sockets.delete(socket);
    for (const s of sockets) {
      s.emit('usersInfo', users);
    }
    console.log(`Remaining sockets: ${sockets.size}`);
  });

});

server.listen(process.env.PORT || 8080);
