const {Schema, model, default : mongoose} = require('mongoose');
const ExerciseSchema = require('./exercise')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "Guest"
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    trainings: [{type: mongoose.Types.ObjectId, ref: 'trainings'}],
    currentTraining: { type: mongoose.Types.ObjectId, ref: 'trainings'},
    stats: {
        exercises: {
            type: Map,
            of: 
                {
                    type: Map,
                    of : {
                        weight: Number,
                        sets: Number,
                        repeats: Number,
                        _id: false
                    },
                },
            default: {}
        },
        bodyWeight: {
            type: Map,
            of: Number,
            default: {}
        }
    }
})

module.exports = model('User', UserSchema)