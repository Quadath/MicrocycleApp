const {Schema, model, default: mongoose} = require('mongoose');

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Training"
    },
    author: {type: mongoose.Types.ObjectId, required: true},
    days: {
        type: Map, of:  
        [
            {
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }
        ]
    }
})

module.exports = model('Training', TrainingSchema)