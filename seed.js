const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env.DATABASE_URL);

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    const Book = require('./models/books.js');
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
    } catch (error){
        console.log('error<-------------ERROR')
    }
    mongoose.disconnect();
}
module.exports = seed;