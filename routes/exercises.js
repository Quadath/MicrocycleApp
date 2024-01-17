const {Router} = require('express')
const ExerciseSchema = require('../models/exercise')
const ObjectIdMiddleware = require('../middleware/ObjectIdMiddleware')

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

router.delete('/', (req, res, next) => ObjectIdMiddleware(req, res, next),
    async(req, res, next) => IsExerciseExist(req, res, next), 
    async (req, res) => {
        const {id} = req.body;
        const deleted = await ExerciseSchema.findByIdAndDelete(id);
        res.status(200);
        res.json(deleted);
        return res.send();
})


async function IsExerciseExist(req, res, next) {
    const {id} = req.body;
    const exercise = await ExerciseSchema.findById(id)
    if (exercise === null) {
        res.status(404)
        return res.send(`{"error": "No exercise found with id ${id}"}`)
    }
    next();
}