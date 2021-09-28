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
seed();

app.get('/books', async (request, response) => {
  const title = request.query;
  console.log(request.query.title, '<---- REQUEST SEARCH QUERY LOG ---<<<');
  try {
    console.log(title.title, '<---- WHAT IS TITLE ---<<<');
    const books = await Book.find({title});
    response.status(200).send(books)
  } catch (error){
    console.log('---> GET BOOKS ERROR LOG <---');
    response.status(400).send('better luck next time')
  }
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));