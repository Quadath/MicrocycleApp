const {Schema, model, default: mongoose} = require('mongoose');

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Training"
    },
    author: {type: mongoose.Types.ObjectId, required: true},
    days: {
        monday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        tuesday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        wednesday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        thursday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        friday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        saturday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
        sunday: {
            type: [{
                exerciseID: {type: mongoose.Types.ObjectId, ref: 'exercises'},
                _id: false
            }],
            default: []
        },
    }
})

module.exports = model('Training', TrainingSchema)