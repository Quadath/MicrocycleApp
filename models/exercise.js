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
    }
})

module.exports = model('User', UserSchema)