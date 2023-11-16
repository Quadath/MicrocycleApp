const {Schema, model} = require('mongoose');
const ExerciseSchema = require('./exercise')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    stats: {
        exerciseId: {
            type: Map,
            of: [
                {
                    date: Date,
                    weight: Number,
                    cycles: Number,
                    repeats: Number
                }
            ]
        }
    }
})