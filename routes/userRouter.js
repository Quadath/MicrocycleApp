const protectRoute = require('../middleware/protectedRoute');
const UserSchema = require('../models/user')
const ExerciseSchema = require('../models/exercise')
const ObjectId = require('mongoose').Types.ObjectId
const {Router} = require('express')

const router = Router()

router.get('/stats', async (req, res) => {
    if (!req.session.user) {
        res.status(403);
        return res.send();
    }
    const user = await UserSchema.findById(req.session.user).lean()

    // const result = await UserSchema.findOneAndUpdate({_id: req.session.user, stats: {$exists: true}}, {
    //     $set: {
    //         [`stats.exercises.${"65ad6995beb43c92d10585da"}.${toDateKey(new Date())}`] : {weight: 30, sets: 3, repeats: 8}
    //     }
    // })
    return res.status(200).json(user.stats);

})

router.post('/stats/exercises/:id',
    (req,res, next) => protectRoute(req,res,next),
    async (req, res) => {
        const {data} = req.body;
        const userId = req.session.user;
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(403).send({error: "Invalid id"})
        }
        await UserSchema.findOneAndUpdate(
            {_id: userId, stats: {$exists: true}, [`stats.exercises.${req.params.id}`] : {$exists: false}}, 
            {[`stats.exercises.${req.params.id}`]: {}
        })

        if(!data) return res.send()
        const user = await UserSchema.findById(userId).lean();
        const stats = user.stats;

        const updatedStats = {...stats.exercises[`${req.params.id}`], ...data}

        const result = await UserSchema.findByIdAndUpdate(userId, {
            [`stats.exercises.${req.params.id}`] : updatedStats
        })
        console.log(result)
        // const exerciseData = Object.keys(data).map(item => data[item])


        // console.log(exerciseData)
        // const user = await UserSchema.findOneAndUpdate(
        //     {_id: userId},
        //     {$push : {[`stats.exercises.${req.params.id}`]: {$each: [exerciseData]}}}
        // )


        return res.send({message: 'success'})
    })



router.get('/nfnf', async (req, res) => {

    const result = await UserSchema.findOneAndUpdate({_id: "65b7c258b8663b026d3a2ce7", stats: {$exists: true}}, {
        $set: {
            [`stats.exercises.65b3a9ab6f16ec3ecd1f517f.${toDateKey(new Date())}`] : {weight: 120, sets: 3, repeats: 5}
        }
    })

    
    // user.set(`stats.exercises.${"65ad6995beb43c92d10585da"}`, [])
    // user.get(`stats.exercises.${"65ad6995beb43c92d10585da"}`).set(toDateKey(new Date()),{weight: 100, sets: 3, repeats: 5})
    // console.log(user.get('stats.exercises'))
})

function toDateKey(date) {
    return date.toISOString().split('T')[0].replaceAll("-", "_");
}

module.exports = router;


