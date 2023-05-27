const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const length = value.trim().length
            if (length < 3) {
                throw new Error("Name should contain atleast 3 characters")
            }
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!value.match(regex)) {
                throw new Error(
                    "Invalid email format"
                );
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const length = value.trim().length
            if (length < 6) {
                throw new Error("Password should contain atleast 6 characters")
            }
        }
    }
})


module.exports = mongoose.model('User', User)