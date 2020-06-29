const Book = require('../models/Book');
const router = require('express').Router();
const { bookValidation } = require('../validation');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books)
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err });
    }
});

router.post('/', async (req, res) => {

    // const { error } = bookValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    });

    try {
        const savedBook = await book.save();
        res.status(200).send(savedBook);
    } catch (err) {
        res.status(401).send({ message: err })
    }
});

router.put("/:id", async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    // const { error } = bookValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const book = {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    };

    try {
        const updatedBook = await Book.updateOne({ _id: req.params.id }, { $set: book });
        res.status(200).send(updatedBook);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: err });
    }
});

router.delete("/:id", async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    try {
        const removedProduct = await Book.deleteOne({ _id: req.params.id });
        res.status(200).send(removedProduct);
    } catch (err) {
        res.status(401).send({ message: err });
    }
});

module.exports = router;