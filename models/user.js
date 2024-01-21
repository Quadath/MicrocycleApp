const {Schema, model} = require('mongoose');
const ExerciseSchema = require('./exercise')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Guest"
    },
    username: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    stats: {
        exercises: {
            type: Map,
            of: [
                {
                    date: Date,
                    weight: Number,
                    cycles: Number,
                    repeats: Number,
                    _id: false
                }
            ]
        }
    }
})

module.exports = model('User', UserSchema)