const express=require('express');
const booksystem = require('../sql/booksystem');
const deleteBook=express.Router();
const fs=require('fs')

// Handle requests to delete book
deleteBook.get('/deletebook',(req,res)=>{
    booksystem.query('delete from books where id=?',[req.query.bookid],(err,results)=>{
        if(results.affectedRows==1){
           
            fs.unlink(`bookpic/${req.query.pic}`,err=>{
                return err? console.log(err): res.status(200).send({msg:'Success'}) ;
             })
        }else{
            res.status(401).send({msg:'Error'});
        }
            

    })
})
module.exports=deleteBook;