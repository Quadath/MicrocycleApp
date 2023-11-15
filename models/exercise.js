const {Schema, model, mongo} = require('mongoose');

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        default: "NO NAME IS SET"
    },
    descripiton: {
        type: String,
        min: 5
    },
    stats: [
        {
            date: {
                type: Date,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            cycles: {
                type: Number,
                required: true
            },
            repeats: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = model('User', UserSchema)