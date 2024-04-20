const express=require('express');
const baseURL = require('../baseURL');
const booksystem = require('../sql/booksystem');
const lendBooks=express.Router();
lendBooks.get('/lendbooks',(req,res)=>{
    // Search book
    booksystem.query('select * from books where bookid=?',[req.query.bookid],(err,result)=>{

        // Determine whether the book can be borrowed
        if(result[0].status==0){
            // Modify book information
            let booksInfo={...result[0],lenduserid:req.query.userid,status:1}
            booksystem.query('update books set ? where bookid=?',[booksInfo,req.query.bookid],(err,result1)=>{
                // Determine whether the borrowing is successful
                    if(result1.affectedRows==1){      
                        // User's borrowing history information is updated.               
                        booksystem.query('select lendbook from students where id=?',[req.query.userid],(err,result2)=>{
                            let newLendBook='';
                            if(result2[0].lendbook==null){
                                newLendBook=booksInfo.id;
                            }else{
                                newLendBook=result2[0].lendbook+','+booksInfo.id;
                            }
                            
                            booksystem.query('update students set lendbook=? where id=?',[newLendBook,req.query.userid],(err,result3)=>{
                                booksInfo.picname=baseURL+'/book/picimg/'+booksInfo.picname;
                                if(result3.affectedRows==1) return res.status(200).send({data:booksInfo});
                            })
                        })
                    }
            })
        }
    })
})
module.exports=lendBooks;