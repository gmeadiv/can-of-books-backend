const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/books.js');

async function seed() {
    try {
        await Book.create ({
            title: 'For Whom the Bell Rings',
            description: 'Informs the reader for whom the bell rang',
            status: true,
            email: 'gmeadiv@gmail.com'
        });
        await Book.create ({
            title: 'The Stand',
            description: 'good vs evil',
            status: true,
            email: 'cameronkwalden@gmail.com'
        });
        await Book.create ({
            title: 'From Hell',
            description: 'Jack the Ripper',
            status: true,
            email: 'alanmoore@aol.com'
        });
        mongoose.disconnect();
    } catch (error){
        console.log('error')
    }
    
}
module.exports = seed;