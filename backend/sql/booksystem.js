// Link to sql database
const mysql = require('mysql');
const booksystem = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'wzb19990615',
    database: 'books_manage_system'
})
module.exports = booksystem;