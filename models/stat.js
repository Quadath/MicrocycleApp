const {Schema, model} = require('mongoose');
const ExerciseSchema = require('./exercise')

const StatSchema = new Schema({
    stats: [
        {
            date: Date,
            exercise: ExerciseSchema.ObjectId,
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