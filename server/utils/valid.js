var isValid=(str)=>{
   if( typeof(str)=='string' && str.trim().length>0)
  {
      return true;
  }
}
module.exports={isValid};
