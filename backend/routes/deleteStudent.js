const express=require('express');
const booksystem = require('../sql/booksystem');
const deleteStudent=express.Router();

// Handle requests to delete student information
deleteStudent.get('/deletestudent',(req,res)=>{
    booksystem.query('delete from students where id=?',[req.query.userid],(err,result)=>{
        const bookClear={lenduserid:null,status:0}; 
        booksystem.query('update books set ? where lenduserid=?',[bookClear,req.query.userid],(err,results)=>{       
                return result.affectedRows==1 ? res.status(200).send({msg:'Success'}) : res.status(401).send({msg:'Error'});
        })
    })
})
module.exports=deleteStudent;
