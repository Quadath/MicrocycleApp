const {Schema, model} = require('mongoose');
const ExerciseSchema = require('./exercise')

const TrainingSchema = new Schema({
    days: [
        {
            day: {
                type: String
            },
            exercises: [ExerciseSchema]
        }
    ]
})