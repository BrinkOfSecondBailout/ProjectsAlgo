const {Cart} = require('../models/cart.model');

module.exports.addToCart = async (request, response) => {
    const id = request.params.id;
    try {
        const cart = await Cart.findOne({userId: id})
        console.log(request.body.item)
        cart.items.push({item: request.body.item})
        cart.save()
        response.json("Item successfully added")
    } catch(err) {
        response.json(err)
    }
}

module.exports.showMyCart = async (request, response) => {
    const id = request.params.id;
    Cart.findOne({userId: id}).populate('items.item')
    .then(cart => {
            response.json(cart)
    })
    .catch(err => {
            response.json(err)
    })
}