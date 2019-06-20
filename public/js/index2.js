var socket=io();

socket.on('connect',function(){
   var params=jQuery.deparam(window.location.search);
   socket.emit('join',params,function(e){
     if(e){
        alert(e);
        window.location.href='/';
     }
     else{
         console.log('No error');
     }
   });
   
});
socket.on('disconnect',function(){
   console.log('server is down');
});
socket.on('updated list',function(users){
  var ol=jQuery('<ol></ol>');
  users.forEach(function(user) {
     ol.append(jQuery('<li></li>').text(user));
     
     
  });
  jQuery('#use').html(ol);

});
socket.on('newMessage',function(message){
  var formattedtime=moment(message.createdAt).format('h:mm a');
   var template1=jQuery('#message-template').html();
       var html=Mustache.render(template1,{
             from:message.from,
             text:message.text,
             createdAt:formattedtime
      });
      jQuery('#m').append(html);
    
   });
jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
     socket.emit('createMessage',{
        from:jQuery('[id=user]').val(),
        text:jQuery('[id=text').val()
     },function(){});
});
