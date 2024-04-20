const express=require('express');
const booksystem = require('../sql/booksystem');
const allBooksInfo=express.Router();
const baseURL=require('../baseURL');

// Route to get information about all books
allBooksInfo.get('/allbooksinfo',(req,res)=>{
    booksystem.query('select * from books',(err,results)=>{
        try{
            if(results.length>0){
                results.forEach(item => {
                    item.picname=baseURL+'/book/picimg/'+item.picname;
                });
                res.status(200).send({data:results})
            }
        }catch{
                res.status(401).send({msg:'Error'})
        }
    })
   
})
module.exports=allBooksInfo;