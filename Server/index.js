const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db');
const productRoute = require('./routes/products');
const bookRoute = require('./routes/books.js');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", productRoute);
app.use("/api/books", bookRoute)

app.get("/", (req, res) => {
    res.status(200).send("Hello from nodejs");
})

app.listen(3000, () => {
    console.log("Connected to Server...");
});