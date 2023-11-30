const {Router} = require('express')
const TrainingSchema = require('../models/training')
const ObjectId = require('mongoose').Types.ObjectId

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
    const training = new TrainingSchema({
        days: {}
    })
    data.forEach((element, index) => {
       training.days.set(element, index);
    });
    training.save();
})

router.patch('/', async (req, res) => {
    const {id, days} = req.body;
    
    console.log(ObjectId.isValid(id))
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
        const result = await TrainingSchema.findByIdAndDelete(id);
        res.status(200);
        res.json(result);
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

function ObjectIdMiddleware(req, res, next) {
    const {id} = req.body;
    if(!ObjectId.isValid(id)) {
        res.status(400)
        return res.send('{"error":"Invalid id"')
    }
    next();
}

module.exports = router;
