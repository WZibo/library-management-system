const express=require('express');
const booksystem = require('../sql/booksystem');
const bookReturn=express.Router();
const baseURL=require('../baseURL')

// Route to return a book
bookReturn.get('/bookreturn',(req,res)=>{
    // Retrieve book information from the database
    booksystem.query('select * from books where bookid=?',[req.query.bookid],(err,results)=>{
        try {
            // If no book is found with the provided book id
            if (results.length == 0) {
                return res.status(401).send({
                    msg: 'Error'
                });
         }else {
             let information='Complete Return';
             // Update book status
             const booksInfo={...results[0],lenduserid:null,status:0}; 
             booksystem.query('update books set ? where bookid=?',[booksInfo,req.query.bookid],(err,results1)=>{
                 booksInfo.picname=baseURL+'/book/picimg/'+booksInfo.picname;    
                 console.log(results1)  
                 if(results1){
                   return  res.status(200).send({
                         msg:information,
                         data:booksInfo
                     })
                 }
             })
 
         }
       }catch{
        res.status(401).send({
            data:booksInfo
        })
       }
      
    })
})
module.exports=bookReturn;