var socket=io();
socket.on('connect',function(){
   console.log('server is up');
   
});
socket.on('disconnect',function(){
   console.log('server is down');
});
socket.on('newMessage',function(message){
  var formattedtime=moment(message.createdAt).format('h:mm a');
   var li=jQuery('<li></li>');
   if(!(message.from)||!(message.text)){
      alert("Invalid Input");
   }
   else{
    li.text(`${message.from} at ${formattedtime} : ${message.text}`);
    jQuery('#m').append(li);}
});
jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     socket.emit('createMessage',{
        from:jQuery('[id=user]').val(),
        text:jQuery('[id=text').val()
     },function(){});
});
