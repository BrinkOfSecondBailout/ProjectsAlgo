const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"]
    },
    price: {
        type: float,
        required: [true, "Listing price is required"]
    },
    condition: {
        type: String
    },
    description: {
        type: String,
        minlength: [10, "Description must be least 10 characters"],
        required: [true, "Please type a description"]
    }
}, {timestamps: true})


module.exports.Item = mongoose.model('Item', ItemSchema);