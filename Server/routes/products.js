const Product = require('../models/Product');
const router = require('express').Router();
const { productValidation } = require('../validation');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (err) {
        res.status(401).send({ message: err });
    }
});

router.post('/', async (req, res) => {

    // const { error } = productValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
    } catch (err) {
        res.status(401).send({ message: err })
    }
});

router.put("/:id", async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    // const { error } = productValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };

    try {
        const updatedProduct = await Product.updateOne({ _id: req.params.id }, { $set: product });
        res.status(200).send(updatedProduct);
    } catch (err) {
        res.status(401).send({ message: err });
    }
});

router.delete("/:id", async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id: ${req.params.id}`);

    try {
        const removedProduct = await Product.deleteOne({ _id: req.params.id });
        res.status(200).send(removedProduct);
    } catch (err) {
        res.status(401).send({ message: err });
    }
});

module.exports = router;