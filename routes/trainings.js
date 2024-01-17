const {Router} = require('express')
const TrainingSchema = require('../models/training')
const ExerciseSchema = require('../models/exercise')
const ObjectIdMiddleware = require('../middleware/ObjectIdMiddleware')

const router = Router()

router.get('/', async (req,res) => {
    const trainings = await TrainingSchema.find({});
    console.log(trainings);
    res.status(200);
    return res.send(trainings);
})

router.post('/', async (req,res) => {
    const data = req.body;
    console.log(data)

    const exercise = await ExerciseSchema.findById("6583d4d2226147789463c1f5");
    console.log(exercise);
    const training = new TrainingSchema({
        days: [
            {
                name: 'monday',
                exercises: [exercise._id]
            }
        ]
    })

    training.save();
})

router.patch('/', (req,res,next) => ObjectIdMiddleware(req,res, next),
    async (req, res, next) => IsTrainingExist(req, res, next), 
    async (req, res) => {
        const {id, days} = req.body;
        
        const training = await TrainingSchema.findById(id);
        if (!training) return;
        const entries = Object.keys(days);
        entries.forEach(entry => {
            training.days.set(entry, days[entry].value.toString());
        })
        training.save();
})

router.delete('/', (req,res,next) => ObjectIdMiddleware(req,res, next),
    async (req, res, next) => await IsTrainingExist(req, res, next),
    async (req, res) => {
        const {id} = req.body;
        const deleted = await TrainingSchema.findByIdAndDelete(id);
        res.status(200);
        res.json(deleted);
        return res.send();
    })

async function IsTrainingExist(req, res, next) {
    const {id} = req.body;
    const training = await TrainingSchema.findById(id)
    if (training === null) {
        res.status(404)
        return res.send(`{"error": "No training found with id ${id}"}`)
    }
    next();
}

module.exports = router;
