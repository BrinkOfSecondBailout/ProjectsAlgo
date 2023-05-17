const {Cart} = require('../models/cart.model');

module.exports.addToCart = async (request, response) => {
    const id = request.params.id;
    try {
        const cart = await Cart.findOne({userId: id})
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

module.exports.updateQuantity = async (request, response) => {
    const id = request.params.id;
    try {
        const cart = await Cart.findOne({userId: id}).populate('items')
        const itemIndex = cart.items.findIndex(item => item._id.toString() === request.body.itemId)
        if (itemIndex === -1) {
            return response.json("Item not found in cart")
        }
        cart.items[itemIndex].quantity = request.body.quantity
        await cart.save();
        response.json("Quantity successfully updated")

        // const cartItem = cartItems.findOne({_id: request.body.itemId})
        // console.log(cartItem.quantity)
        // cartItem.quantity = request.body.quantity
        // cartItems.save()
        // response.json("Item successfully added")
    } catch(err) {
        response.json(err)
    }
}