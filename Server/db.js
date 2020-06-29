const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Ecommerce", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Connected To DB...");
    } else {
        console.log("Error in DB Connection", JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;