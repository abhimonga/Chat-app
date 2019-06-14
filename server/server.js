const path=require('path');
const reqPath=path.join(__dirname+'/../public');
const port=process.env.PORT||3000;
const express=require('express');
  var app=express();

app.use(express.static(reqPath));
app.listen(port,()=>{
  console.log(`System is on port  ${port}`);
});