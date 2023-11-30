const {Router} = require('express')
const ExerciseSchema = require('../models/exercise')

const router = Router()

module.exports = router;

router.get('/', async (req,res) => {
    const exercises = await ExerciseSchema.find({}, {__v: 0});
    console.log(exercises);
    res.status(200);
    return res.send(exercises);
})

router.post('/', async (req,res) => {
    const {name, description, abbreviation} = req.body;
    
    if(!name) {
        res.status(400)
        return res.send("Property name is invalid")
    }
    if(name.length < 2) {
        res.status(400);
        return res.send("Propetry name is invalid")
    } 
    let properName;
    if (abbreviation) {
        properName = name.toUpperCase();
    } else {
        properName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    }
    
    let exerciseInstance = await ExerciseSchema.findOne({name: properName})
    console.log(exerciseInstance)
    if (!exerciseInstance) {
        exerciseInstance = await ExerciseSchema.create({name: properName})
    }
    res.status(200);
    return res.json(exerciseInstance);
})