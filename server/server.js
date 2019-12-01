const path = require('path');
const reqPath = path.join(__dirname + '/../public');
const socket = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const express = require('express');
var { Users } = require('./utils/users');
const { message } = require('./utils/message');
const { isValid } = require('./utils/valid.js');


var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var user = new Users();
app.use(express.static(reqPath));
console.log(reqPath);

io.on("connection", function(socket) {
    console.log('New user connected');

    socket.on('join', (params, callback) => {

        socket.join(params.room);
        user.removeUser(socket.id);
        user.addUser(socket.id, params.name, params.room);
        // io.to(params.room).emit('updated list', user.getUserList(params.room));
        // socket.emit('newMessage', message('admin', 'Welcome to new chat'));
        // io.to(user.room).emit('newMessage', message("admin", "New user joined"));

    });

    socket.on('createMessage', (message) => {
        var x = user.getUser(socket.id);
        if (x) {
            io.to(x.room).emit('newMessage', {
                from: message.from,
                text: message.text,
                createdAt: message.createdAt
            });
        }

    });
    // socket.on('disconnect', () => {
    //     var users = user.removeUser(socket.id);
    //     if (users) {
    //         io.emit('updated list', user.getUserList(user.room));
    //         io.to(users.room).emit('newMessage', message("admin", `${users.name} has left`));
    //     }
    // });
});

server.listen(port, () => {
    console.log(`System is on port  ${port}`);
});