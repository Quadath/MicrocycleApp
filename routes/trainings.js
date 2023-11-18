const {Router} = require('express')
const TrainingSchema = require('../models/training')

const router = Router()

module.exports = router;

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
    if(!id) {
        res.status(400)
        return res.send('invalid id')
    }

    const training = await TrainingSchema.findById(id);
    const entries = Object.keys(days);
    entries.forEach(entry => {
        training.days.set(entry, days[entry].value.toString());
    })
    training.save();
})