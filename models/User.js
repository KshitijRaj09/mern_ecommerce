const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter a Valid Password"],
        minlength: [6, "Password should contain atleast 6 characters"]
    },
    emailID: {
        type: String,
        required: [true, "Please enter an EmailID"],
        unique: [true, "Email has already been registered"],
        lowercase: true,
        validate: [isEmail, "Please enter a valid EmailID"]
    },
    created_AT: {
        type: Date,
        default: () => Date.now()
    }
})

const User = mongoose.model("user", UserSchema);
module.exports = User;
