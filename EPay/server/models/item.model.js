const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"]
    },
    price: {
        type: Number,
        required: [true, "Listing price is required"]
    },
    condition: {
        type: String,
        required: [true, "Please specify the item's condition"]
    },
    description: {
        type: String,
        minlength: [10, "Description must be least 10 characters"],
        required: [true, "Please type a description"]
    },
    myFile1: {
        type: String,
        required: false,
        default: ""
    },
    myFile2: {
        type: String,
        required: false,
        default: ""
    },
    myFile3: {
        type: String,
        required: false,
        default: ""
    }
}, {timestamps: true})


module.exports.Item = mongoose.model('Item', ItemSchema);