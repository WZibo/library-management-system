const express=require('express');
const baseURL = require('../baseURL');
const booksystem = require('../sql/booksystem');
const bookSearch=express.Router();

// Route to search for books by name
bookSearch.get('/booksearch', (req, res) => {
    booksystem.query('SELECT * FROM books WHERE bookname LIKE ?', [`%${req.query.bookname}%`], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send({
                status: 500,
                msg: 'Internal Server Error'
            });
        }
        if (result.length === 0) {
            return res.status(404).send({
                status: 404,
            });
        }
        result.forEach(item => {
            item.picname = baseURL + '/book/picimg/' + item.picname;
        });
        res.send({
            status: 0,
            data: result
        });
    });
});

// Route to search for books by name without modifying book objects
bookSearch.get('/booksearchNoMerge',(req,res)=>{
    booksystem.query('select * from books where bookname like ?',[`%${req.query.bookname}%`],(err,result)=>{
        try{
            result.forEach(item => {
                item.picname=baseURL+'/book/picimg/'+item.picname;  
            });
            if(result.length==0){
              return  res.send({
                    status:401,
                })
            }
            res.send({
                status:0,
                data:result,
            })
        }catch{
            res.send({
                status:401,
            })
        }
    })
})
module.exports=bookSearch;