const express=require('express');
const booksystem = require('../sql/booksystem');
const addStudent=express.Router();

// Route to add a new student
addStudent.post('/addstudent',(req,res)=>{
    booksystem.query('insert into students set ?',[req.body.data],(err,results)=>{
        if(results) return  res.status(200).send({msg:'Success'})
        res.status(401).send({msg:'Error'})
    })
})

module.exports=addStudent;