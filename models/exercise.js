const {Schema, model, mongo} = require('mongoose');

const exerciseSchema = new Schema({
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

module.exports = model('Exercise', exerciseSchema)