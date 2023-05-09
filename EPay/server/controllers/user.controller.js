const {User} = require('../models/user.model');
const bcrypt = require('bcryptjs');

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
            console.log(user._id)
            response.json(user)
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err);
        })

}

module.exports.login = async (request, response) => {

    if (request.body.email.length < 1) {
        return response.status(400).json("Please enter an email account")
    }
    const user = await User.findOne({
        email: request.body.email
    })

    if (user) {
        const isMatching = await bcrypt.compare(request.body.password, user.password);
        if (isMatching) {
            return response.json({status: 'ok', user: true})
        } else {
            return response.status(401).json("Please make sure your password is correct")
        }
    } else {
        return response.status(401).json("Email does not exist in database")
    }
}