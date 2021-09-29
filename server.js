'use strict';
require('dotenv').config();
const seed = require('./seed.js')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json())

app.get('/test', (request, response) =>  {
  response.send('hello from the test')
});

const Book = require('./models/books.js');
// seed();
mongoose.connect(process.env.DATABASE_URL);


app.get('/books', async (request, response) => {
  const query= {};
  if(request.query.title) {
    query.title = request.query.title
  }
  // console.log(request.query.title, '<---- REQUEST SEARCH QUERY LOG ---<<<');
  try {
    const books = await Book.find({});
    // console.log(books);
    response.status(200).send(books)
  } catch (error){
    // console.log('---> GET BOOKS ERROR LOG <---');
    response.status(400).send('better luck next time')
  }
});

app.post('/books', async (request, response) => {
  try {
    const newBook = await Book.create ({
      title: bookInfo,
      description: 'Informs the reader for whom the bell rang',
      status: true,
      email: 'gmeadiv@gmail.com'
    });
    response.status(201).send(newBook)
  } catch(error) {
    console.log('---> POST BOOKS ERROR LOG <---');
    response.status(500).send('you failed to fetch a book')
  }
});

app.delete('/books/:id', async (request, response) => {
  const id = request.params.id;

  try {
    await Book.findByIdAndDelete(id);
    response.status(202).send('Book Succesfully Burned')
  } catch(error) {
    console.log('---> DELETE BOOKS ERROR LOG <---');
    response.status(500).send('No Books to Burn!')
  }
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));