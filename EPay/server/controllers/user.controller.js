const {User} = require('../models/user.model');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../utils/errorResponse');

module.exports.register = async (request, response, next) => {
    try {
        await User.create({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        })
        response.json({status: 'ok', user: true})
    } catch (err) {
        next(err);
    }
}

module.exports.login = async (request, response, next) => {
    const user = await User.findOne({
        email: request.body.email
    })

    if (user) {
        const isMatching = await bcrypt.compare(request.body.password, user.password);
        if (isMatching) {
            return response.json({status: 'ok', user: true})
        } else {
            return next(new ErrorResponse("Please make sure your password is correct", 401))
        }
    } else {
        return next(new ErrorResponse("Email does not exist in the database", 401))
    }
}