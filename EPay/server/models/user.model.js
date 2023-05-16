const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const {Item} = require('../models/item.model');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be 5 characters or longer"]
    },
    myFile: {
        type: String,
        required: false,
        default: ""
    },
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]

}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if (!this.skipPasswordHashing) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})


module.exports.User = mongoose.model('User', UserSchema);