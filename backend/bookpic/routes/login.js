const express = require('express');
const studentLogin = express.Router();
const jwt = require('jsonwebtoken');
const booksystem = require('../sql/booksystem');
const secret = require('../common/secret');
// student login
studentLogin.post('/studentlogin', (req, res) => {
    booksystem.query('select password,id,account from  students where account=?', req.body.account, (err, results) => {
        try {
            if (results[0].password === req.body.password) {
               return  res.send({
                    status: 0,
                    msg: 'Login Success',
                    data: results[0],
                    token: 'Bearer ' + jwt.sign({ userid: results[0].id, account: results[0].account, user: 'student' },
                        secret,
                        { expiresIn: '24h' }
                    )
                })
            }
        } catch (err) {
            res.status(422).send();
        }
    });
})
// Administrator login
studentLogin.post('/adminlogin', (req, res) => {
    booksystem.query('select password,id,account from administrator where account=?', req.body.account, (err, results) => {
        try {
                if (results[0].password === req.body.password) {
                   return  res.send({
                        status: 0,
                        msg: 'Login Success',
                        data: results[0],
                        token: 'Bearer ' + jwt.sign({ userid: results[0].id, account: results[0].account, user: 'admin' },
                            secret,
                            { expiresIn: '24h' }

                        )
                    })
                }
        } catch {
            res.status(422).send();
        }


    });
})
module.exports = studentLogin;