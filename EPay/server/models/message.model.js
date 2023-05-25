const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: 
        {
            type: String,
            required: [true, "Please type something"]
        }
    
}, {timestamps: true})

module.exports.Message = mongoose.model('Message', MessageSchema);