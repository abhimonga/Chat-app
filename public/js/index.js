var socket=io();
socket.on('connect',function(){
   console.log('server is up');
   
});
socket.on('disconnect',function(){
   console.log('server is down');
});
socket.on('newMessage',function(message){
   console.log(' New Email arrived',message);
   var li=jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#m').append(li);
});
jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     socket.emit('createMessage',{
        from:jQuery('[id=user]').val(),
        text:jQuery('[id=text').val()
     },function(){});
});
