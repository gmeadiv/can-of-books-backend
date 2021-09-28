'use strict';
require('dotenv').config();
const seed = require('./seed.js')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get('/test', (request, response) =>  {
  response.send('hello from the test')
});

const Book = require('./models/books.js');
mongoose.connect(process.env.DATABASE_URL);
// mongoose.connect('mongodb://localhost:27017/books')
console.log(mongoose.connect);
seed();

app.get('/books', async (request, response) => {
  const searchQuery = request.query;
  // const books = await Book.find(searchQuery);
  // console.log(books);
  // response.send(books);
  try {
    const books = await Book.find(searchQuery);
    console.log(books);
    response.status(200).send(books)
  } catch (error){
    console.log('error');
  }
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));