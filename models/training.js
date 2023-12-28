const {Schema, model, default: mongoose} = require('mongoose');

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Training"
    },
    days: [{
        name: String,
        exercises: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Exercises'}
        ]
    }]
})

module.exports = model('Training', TrainingSchema)