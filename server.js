'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (request, response) =>  {
  response.send('hello from the test')
});

const Book = require('./models/books.js');
const { response } = require('express');
mongoose.connect(process.env.MONGODB_URI);

app.get('/books', async (request, response) => {
  const query = {};

  console.log(request.query, '<---- REQUEST SEARCH QUERY LOG ---<<<');

  if(request.query.title === '' && request.query.email === '') {
    try {
      const books = await Book.find({});
      response.status(200).send(books)
    } catch (error){
      console.log('---> GET ALL BOOKS ERROR LOG <---');
      response.status(400).send('better luck next time')
    }

  } else if (request.query.title === ''){
    query.email = request.query.email;
    try {
      const books = await Book.find({email: query.email});
      if (books.length === 0) {
        response.error(404).send(books.length)
      } else {
        response.status(200).send(books)
      }
    } catch (error){
      console.log('---> GET BY EMAIL ERROR LOG <---');
      response.status(400).send('better luck next time')
    }

  } else {
    query.title = request.query.title;
    try {
      const books = await Book.find({title: query.title});
      if (books.length === 0) {
        response.error(404).send(books.length)
      } else {
        response.status(200).send(books)
      }
    } catch (error){
      console.log('---> GET BY TITLE ERROR LOG <---');
      response.status(400).send('better luck next time')
    }
  }
});

app.post('/books', async (request, response) => {
  
  try {
    const bookInfo = request.body;
    console.log(request, '<---- REQUEST DOT QUERY LOG ---<<<');

    const newBook = await Book.create ({
      title: bookInfo.title,
      description: bookInfo.description,
      status: true,
      email: bookInfo.email
    });

    console.log(newBook, '<---- NEW BOOK CONFIRMED ---<<<');

    response.status(201).send(newBook)
  } catch(error) {
    console.log('---> POST BOOKS ERROR LOG <---');
    response.status(500).send('you failed to post a book')
  }
});

app.delete('/books/:id', async (request, response) => {
  const id = request.params.id;
  console.log(request, '<---- DELETE REQUEST LOG ---<<<');

  if (request.query.email) {
    const foundBook = await Book.findOne({_id: request.params.id, email: request.query.email});

    console.log(foundBook, '<---- FOUNDBOOK LOG ---<<<');
  }

  try {
    await Book.findByIdAndDelete(id);
    response.status(202).send('Book Succesfully Burned')
    console.log('---> Book Succesfully Burned <---')
  } catch (error) {
    console.log('---> DELETE BOOKS ERROR LOG <---');
    response.status(500).send('No Books to Burn!')
  }
});

app.put('/books/:id', async (request, response) => {
  const id = request.params.id;
  const bookInfo = request.body;
  console.log(request.body, '<---- REQUEST DOT BODY LOG ---<<<')

    try {
      const bookToUpdate = await Book.findOne({_id: id});

      if (!bookToUpdate) {
        response.status(400).send('---> BOOK CANNOT BE UPDATED <---');
        return;
      } 

      const updatedBook = await Book.findByIdAndUpdate(id, bookInfo, {new: true});
      console.log(updatedBook, '<---- UPDATED BOOK LOG ---<<<')
      response.status(204).send(updatedBook);

    } catch (error) {
      response.status(400).send(error, '<---- PUT BOOKS ERROR LOG ---<<<');
    }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));