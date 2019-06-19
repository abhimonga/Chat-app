var socket=io();

socket.on('connect',function(){
   console.log('server is up');
   
});
socket.on('disconnect',function(){
   console.log('server is down');
});
socket.on('newMessage',function(message){
  var formattedtime=moment(message.createdAt).format('h:mm a');
  
   if(!(message.from)||!(message.text)){
      alert("Invalid Input");
   }
   else{
      var template=jQuery('#temp').html();
      var html=Mustache.render(template,{
             from:message.from,
             text:message.text,
             createdAt:formattedtime
      });
      jQuery('#m').append(html);
    }

});
jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     socket.emit('createMessage',{
        from:jQuery('[id=user]').val(),
        text:jQuery('[id=text').val()
     },function(){});
});
