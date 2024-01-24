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
            of: 
                {
                    type: Map,
                    of : {
                        weight: Number,
                        sets: Number,
                        repeats: Number,
                        _id: false
                    }
                }
        },
        bodyWeight: {
            type: Map,
            of: Number
        }
    }
})

module.exports = model('User', UserSchema)