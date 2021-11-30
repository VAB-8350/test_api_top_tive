const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const books = require('../data.json');

router.get('/', (req, res) => {
    res.json(books);
});

router.post('/', (req, res) => {
    const { title, year, gender } = req.body;

    if (title && year && gender) {

        const id = String(books.length + 1);
        const newBook = {id, ...req.body};
        books.push(newBook);

        res.json(books);
    } else {
        res.status(500).json({error: 'there was an error.'});
    };
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(books, (book, i) => {
        if (book.id == id) {
            books.splice(i, 1);
        }
    });
    res.send('deleted');
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, year, gender } = req.body;
    if (title && year && gender) {
        _.each(books, (book, i) => {
            if (book.id == id) {
                book.title = title;
                book.year = year;
                book.gender = gender;
            }
        });
        res.json(books);
    } else{
        res.status(500).json({error: 'there was an error.'});
    }

});

module.exports = router;