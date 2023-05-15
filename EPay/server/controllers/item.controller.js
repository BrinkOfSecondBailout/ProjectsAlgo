const {Item} = require('../models/item.model');

module.exports.newItem = async (request, response) => {
    Item.create({
        name: request.body.name,
        price: request.body.price,
        condition: request.body.condition,
        description: request.body.description,
        userId: request.body.userId,
        user: request.body.user,
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

module.exports.getOne = async (request, response) => {
    Item.findOne({_id: request.params.id}).populate('user')
        .then(item => {
            response.json(item)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getAllByUser = async (request, response) => {
    Item.find({userId: request.params.userId})
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getAllNotByUser = async (request, response) => {
    Item.find({ userId: { $ne: request.params.userId} })
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}