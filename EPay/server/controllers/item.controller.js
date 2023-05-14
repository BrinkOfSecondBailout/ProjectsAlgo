const {Item} = require('../models/item.model');

module.exports.newItem = async (request, response) => {
    Item.create({
        name: request.body.name,
        price: request.body.price,
        condition: request.body.condition,
        description: request.body.description,
        myFile1: request.body.myFile1,
        myFile2: request.body.myFile2,
        myFile3: request.body.myFile3
    })
        .then(item => response.json(item))
        .catch(err => response.status(400).json(err))
}

module.exports.getAll = async (request, response) => {
    Item.find({})
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}