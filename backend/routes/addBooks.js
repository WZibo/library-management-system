const express=require('express');
const addBooks=express.Router();
const multiparty=require('multiparty');
const fs=require('fs');
const path= require('path');
const booksystem = require('../sql/booksystem');
addBooks.post('/addbooks',(req,res)=>{
        let form=new multiparty.Form({uploadDir:path.join(__dirname,'../bookpic')});
        form.parse(req,(err,fileds,files)=>{
            let bookData=JSON.parse(fileds.data);
            // Determine whether the book number exists
            booksystem.query('select count(*) as num from books where bookid=?',[bookData.bookid],(err,result)=>{
                if(result[0].num==0){
                    bookData.booknumber=bookData.bookid.split('-')[0];
                    // File name to save
                    bookData.picname=bookData.bookid+'.jpg';
                    // Add record to database
                    booksystem.query('insert into books set ?',[bookData],(err,result1)=>{
                        if(result1){        
                            // File rename                   
                            fs.rename(files.picname[0].path,`bookpic/${bookData.picname}`,(err)=>{
                                return  err ? console.log(err) : res.status(200).send({msg:'Success'});                           
                            })
                        }
                    })
                }else{
                  res.status(401).send({msg:'Error'});
                // Delete incoming files
                  fs.unlink(files.picname[0].path,err=>{
                     return err? console.log(err):console.log('success');
                  })
                }
            })          
        })
})

module.exports=addBooks;
