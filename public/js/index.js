var socket=io();
socket.on('connect',function(){
   console.log('server is up');
   
});
socket.on('disconnect',function(){
   console.log('server is down');
});
socket.on('newMessage',function(message){
   console.log(' New Email arrived',message);

});
