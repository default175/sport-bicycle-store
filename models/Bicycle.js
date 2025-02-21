const mongoose = require('mongoose');

const BicycleSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    description: String,
    stock: Number,
    ratings: [Number]
});

module.exports = mongoose.model("Bicycle", BicycleSchema);
