const _ = require('underscore');
const Book = require('../models/books');


export const getBooks = async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
}

export const getBookId = async (req, res) => {
    const { id } = req.params;
    const bookId = await Book.findById(id);
    res.status(200).json(bookId);
}

export const addBook = async (req, res) => {
    const book = new Book(req.body);
    const newbook = await book.save();
    res.status(201).json(newbook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.remove({_id: id});
    res.status(204).json();
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const bookUpdated = await Book.findByIdAndUpdate(id, req.body);
    res.status(205).json(bookUpdated);
}