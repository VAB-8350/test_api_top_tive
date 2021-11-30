const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const Book = require('../models/books');

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const bock = new Book(req.body);
    await bock.save();
    res.send('saved');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Book.remove({_id: id});
    res.send('deleted');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    await Book.update({_id: id}, req.body);
    res.send('updated')
});

module.exports = router;