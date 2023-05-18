const {User} = require('../models/user.model');
const {Cart} = require('../models/cart.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, 'dannydevelopersatoshi', {expiresIn: '3d'})
}


module.exports.register = async (request, response) => {
    const user = await User.findOne({
        email: request.body.email
    })

    if (user) {
        return response.status(400).json({errors: {email: {message: "Email already in the database"}}})
    }

    User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    })
        .then (user => {
            const token = createToken(user._id)
            const cart = Cart.create({
                userId: user._id
            })
            // user.cart = cart._id
            // console.log(cart._id)
            // user.skipPasswordHashing=true;
            // user.save()
            // console.log(user.cart)
            response.json({id: user._id, token})
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err);
        })

}

module.exports.login = async (request, response) => {
    if (request.body.email.length < 1) {
        return response.status(400).json("Please enter an email")
    }
    const user = await User.findOne({
        email: request.body.email
    })
    if (user) {
        const isMatching = await bcrypt.compare(request.body.password, user.password);
        if (isMatching) {
            const token = createToken(user._id)
            return response.json({id: user._id, token})
        } else {
            return response.status(401).json("Please make sure your password is correct")
        }
    } else {
        return response.status(401).json("Email does not exist in database")
    }
}

module.exports.getOneUser = (request, response) => {
    User.findOne({_id: request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updatePicture = async (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}

// module.exports.addItemToCart = async (request, response) => {

//     const id = request.params.id;
//     try {
//         const user = await User.findById(id).populate('cart')
//         console.log(user.cart)
//         user.cart.push(request.body)
//         user.skipPasswordHashing=true;
//         await user.save();
//         console.log(user.cart[0].item)
//         response.json("Item successfully added")
//     } catch(err) {
//         response.json(err)
//     }
// }


module.exports.getMyCart = async (request, response) => {
    User.findOne({_id: request.params.id}).populate('cart')
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.getAllUsers = async (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.json(err))
}