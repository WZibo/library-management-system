const express = require('express');
const app = express();

// cors module
const cors = require('cors');
const path = require('path');
// Get parameters in post request
const expressJWT = require('express-jwt');

const history = require('connect-history-api-fallback');
// routing module
const login = require('./routes/login');
const studentInfo = require('./routes/studentinfo');
const studentLend = require('./routes/studentLend');
const bookSearch = require('./routes/bookSearch');
const bookReturn = require('./routes/bookReturn');
const getStudentInfo = require('./routes/getStudentInfo');
const lendBooks = require('./routes/lendBooks');
const allBooksInfo = require('./routes/allBooksInfo');
const deleteBook = require('./routes/deleteBook');
const addStudent = require('./routes/addStudent');
const deleteStudent = require('./routes/deleteStudent');
const checkToken = require('./routes/checkToken');
const addBooks = require('./routes/addBooks');

// token key
const secretkey = 'bookmanage';
app.use(history());
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.static('dist'));
app.use(expressJWT({ secret: secretkey, algorithms: ['HS256'] }).unless({ path: [/^\/login/, /^\/book\/picimg/] }))
app.use(express.static('bookpic'));

// Routes for handling different endpoints
app.use('/login', login);
app.use(checkToken);
app.use('/student', studentInfo);
app.use('/student', studentLend);
app.use(bookSearch);
app.use('/books', [bookReturn]);
app.use('/admin', [getStudentInfo, lendBooks, allBooksInfo, deleteBook, addStudent, deleteStudent, addBooks]);

// Route to serve book images
app.get('/book/picimg/:picname', (req, res) => {
    res.sendFile(path.join(__dirname, '/bookpic/' + req.params.picname))
})
// Start the server on port 8000
app.listen(8000, () => {
    console.log('Server started successfully');
})