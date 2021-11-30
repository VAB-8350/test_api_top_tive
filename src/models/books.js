const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    year: String,
    genre: String
});

module.exports = mongoose.model('book', BookSchema);