const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [10, "First name must be less than 10 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: [10, "Last name must be less than 10 characters"]
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
    }
    

}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if (!this.skipPasswordHashing) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)

    }
    next();
})


module.exports.User = mongoose.model('User', UserSchema);