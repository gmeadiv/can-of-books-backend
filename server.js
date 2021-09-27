'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testone');

// console.log(mongoose);
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function () {
  console.log('connected to the database!');
});


// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow', '<---- MONGOOSE LOG ---<<<'));

app.use(cors());

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));