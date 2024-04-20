const express=require('express');
const booksystem = require('../sql/booksystem');
const studentInfo=express.Router();
studentInfo.get('/studentinfo',(req,res)=>{
    console.log(req.user)
    // Get user information based on id
    try{
        booksystem.query('select * from students where id=? and account=?',[req.user.userid,req.user.account],(err,results)=>{  
            if(results.length===0){
                return res.status(401).send()
            };
    
            const userinfo={...results[0],password:null,status:null,headurl:null};
            let allLendbooks=[];
             // Total number of books borrowed by users
             userinfo.allLendNum=allLendbooks.length;
            if(results[0].lendbook){
                // Convert the IDs of books borrowed by the user into an array
                 allLendbooks=results[0].lendbook.split(',');
                  userinfo.allLendNum=allLendbooks.length;
                  // Array deduplication
                  let books=new Set(allLendbooks);
                  allLendbooks=[...books];
            }
    
    
            try{
                booksystem.query('select count(*) as num from books where id in (?) and lenduserid=?',[allLendbooks,req.user.userid],(err,result1)=>{
                    result1? userinfo.needreturn=result1[0].num:userinfo.needreturn=0;

                    res.send({
                        status:200,
                        data:userinfo
                    })
                })
            }catch{
                res.send({
                    status:401
                })
            }
           
          
        })
    }catch{
         res.status(401).send()
    }
})
studentInfo.get('/getallstudent',(req,res)=>{
     // Get all user information
     booksystem.query('select * from students',(err,results)=>{  
         const userinfo=results.map(item => {
             return {...item,password:null,status:null,headurl:null}
         });
          return  res.status(200).send({data:userinfo})
       
      
    })   

})
studentInfo.post('/changeStudentInfo', (req, res) => {
    // Modify user information
   try{
    booksystem.query('update students set ? where id=?',[req.body,req.body.id],(err, results) => {
        if(results&&results.affectedRows){
            return res.send({
                status:200,
                data:req.body,
            })
        }
    })
   }catch(err){
    res.status(401).send();
   }

})
module.exports=studentInfo;