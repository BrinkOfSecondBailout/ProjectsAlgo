const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



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
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please select a valid email"
        },
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be 5 characters or longer"]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
})


module.exports.User = mongoose.model('User', UserSchema);