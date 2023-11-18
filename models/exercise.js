const {Schema, model, mongo} = require('mongoose');

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        default: "NO NAME IS SET"
    },
    abbreviation:{
        type: String,
        min: 2
    },
    descripiton: {
        type: String,
        min: 5
    }
})

module.exports.schema = {ExerciseSchema}
module.exports = model('Exercise', ExerciseSchema)