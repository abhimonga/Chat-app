const path=require('path');
const reqPath=path.join(__dirname+'/../public');
const socket=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000;
const express=require('express');
  var app=express();
var server=http.createServer(app);
var io=socket(server);
app.use(express.static(reqPath));
io.on("connection",(socket)=>{
 console.log('New user connected');
 socket.on('disconnect',()=>{
  console.log('New user disconnected');
 });
});

server.listen(port,()=>{
  console.log(`System is on port  ${port}`);
});