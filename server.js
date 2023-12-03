// server.js
import express from "express";
import ejs from "ejs";
import bodyParser from 'body-parser';
import { updateData, showData, addData, deleteData, singlePerson } from './database.js';

const app = express();
const router = express();
const port = 3006;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/index', async (req, res) => {
  try {
    const records = await showData(); 
    res.render('index', { data: records });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/forms', (req, res) => {
  res.render('forms'); 
});

app.post('/add', (req, res) => {
   //const { stud_name, class1, book_name, book_isbn, book_author, borrowed_date, return_date } = req.body;
   const oStudent = req.body; 
   addData(oStudent);
 
  res.redirect('/index'); 
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  deleteData(id);
  res.render('index');
});


app.get('/updateData/:id', async (req, res) =>{
  const id = req.params.id;
  const row = await singlePerson(id);
  res.render('updateData', {person: row[0]});
})


app.post('/update/:id', (req, res) =>{
  const id = req.params.id;
  const {stud_name, class1, book_name, book_isbn, book_author, borrowed_date, return_date} = req.body;
  updateData( stud_name, class1, book_name, book_isbn, book_author, borrowed_date, return_date, id );
  res.redirect('/index');
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
