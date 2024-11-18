const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    fname: String,
    lname: String,
    email: {
        type: String,
        unique: true
    },
    mobile: Number,
    gender: String,
    location: String,
    status: {
        type: String,
        default: "Active"
    },
    img: {
        public_id: String,
        url: String

    }
}, { timestamps: true })
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;