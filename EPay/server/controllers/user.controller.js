const {User} = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.create = async (request, response) => {
    try {
        const encryptedPassword = await bcrypt.hash(request.body.password, 10);
        await User.create({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: encryptedPassword
        })
        response.json({status: 'ok', user: true})
    } catch (err) {
        response.json({status: 'error', error: 'That email already exists'})
    }
}

module.exports.login = async (request, response) => {
    const user = await User.findOne({
        email: request.body.email
    })

    if (user) {
        const isMatching = await bcrypt.compare(request.body.password, user.password);
        if (isMatching) {
            return response.json({status: 'ok', user: true})
        } else {
            return response.json({status: 'error', error: "Incorrect password"})
        }
    } else {
        return response.json({status: 'error', error: "Email doesn't exist in the database"})
    }
}