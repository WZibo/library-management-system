const express=require('express');
const checkToken=express.Router();
checkToken.get('/checktoken',(req,res)=>{
    try{
      if(req.user){
        return  res.status(200).send({data:{user:req.user.user}})
      }
      throw 'err'
    }catch{
      res.status(401).send({msg:'Error'});
    }
   
})
module.exports=checkToken;