const {Schema, model} = require('mongoose');
const {ExerciseSchema} = require('./exercise')

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Training"
    },
    days: {
        type: Map,
        of: String
    }
})

module.exports = model('Training', TrainingSchema)