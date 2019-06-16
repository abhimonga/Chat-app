const path=require('path');
const reqPath=path.join(__dirname+'/../public');
const socket=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000;
const express=require('express');
const {message}=require('./utils/message');
  var app=express();
var server=http.createServer(app);
var io=socket.listen(server);
app.use(express.static(reqPath));

io.on("connection",function(socket){
 console.log('New user connected');
  socket.emit('newMessage',message('admin','Welcome to new chat')
);
  socket.broadcast.emit('newMessage',message("admin","New user joined")
);
 
 socket.on('createMessage',(message)=>{
  
  io.emit('newMessage',{
    from:message.from,
    text:message.text
 });
 });
 socket.on('disconnect',()=>{
  console.log('New user disconnected');
 });
});

server.listen(port,()=>{
  console.log(`System is on port  ${port}`);
});