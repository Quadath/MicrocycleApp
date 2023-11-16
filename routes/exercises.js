const {Router} = require('express')
const ExerciseSchema = require('../models/exercise')

const router = Router()

module.exports = router;

router.get('/', (req,res) => {
    res.send('List of exercises')
})

router.post('/post', async (req,res) => {
    const {name, description} = req.body;
    

    if(!name) {
        res.status(400)
        return res.send("Property name is invalid")
    }
    if(name.length < 2) {
        res.status(400);
        return res.send("Propetry name is invalid")
    } 
    
    const properName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
    
    let exerciseInstance = await ExerciseSchema.findOne({name: properName})
    console.log(exerciseInstance)
    if (!exerciseInstance) {
        exerciseInstance = await ExerciseSchema.create({name: properName})
    }
    console.log(exerciseInstance);
    res.status(200);
    return res.json(exerciseInstance);
})