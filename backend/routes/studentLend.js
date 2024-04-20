const express=require('express');
const baseURL = require('../baseURL');
const booksystem = require('../sql/booksystem');
const studentLend=express.Router();
studentLend.get('/studentlend',(req,res)=>{
     try{
          if(req.user.user=='student'){
               booksystem.query('select lendbook from students where id=?',[req.user.userid],(err,results)=>{
                    if(results.length==0){
                         res.status(401).send()
                    }else{
                    // Convert the IDs of books borrowed by the user into an array
                    let allLendbooks=[];
                    if(results[0].lendbook!==undefined&&results[0].lendbook!==null){
                     allLendbooks=results[0].lendbook.split(',');
                     console.log(allLendbooks)
                    // Array deduplication
                    let books=new Set(allLendbooks);
                    
                    allLendbooks=[...books];
                    }
                   booksystem.query('select * from books where id in (?) and lenduserid=?',[allLendbooks,req.user.userid],(err,results1)=>{
                        if(results1){
                         results1.forEach(item => {
                              item.picname=baseURL+'/book/picimg/'+item.picname;               
                      });
          
                        }
                       
                         res.send({
                             status:0,
                             data:results1
                         })
                     
                    })
                    }
               })
          }
     }catch{
          res.status(401).send()
     }

})
module.exports=studentLend;
