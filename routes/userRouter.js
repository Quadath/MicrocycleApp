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
        const userId = req.session.user;
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(403).send({error: "Invalid id"})
        }
        const exercise = await ExerciseSchema.findById(req.params.id);
        const user = await UserSchema.findOneAndUpdate({_id: userId, stats: {$exists: true}}, {
            [`stats.exercises.${req.params.id}`]: {}
        })
        return res.send({message: 'success'})
    })

router.get('/nfnf', async (req, res) => {
    const a = await UserSchema.findOneAndUpdate({_id: "65ae7df3384d27501629ae9d", stats: {$exists: false}}, { 
        $set: {
            stats: {
                exercises: []
            }
        }
    })
    const result = await UserSchema.findOneAndUpdate({_id: "65ae7df3384d27501629ae9d", stats: {$exists: true}}, {
        $set: {
            [`stats.exercises.${"65ae6288089d7318c3e660c7"}.${toDateKey(new Date())}`] : {weight: 120, sets: 3, repeats: 5}
        }
    })

    
    // user.set(`stats.exercises.${"65ad6995beb43c92d10585da"}`, [])
    // user.get(`stats.exercises.${"65ad6995beb43c92d10585da"}`).set(toDateKey(new Date()),{weight: 100, sets: 3, repeats: 5})
    console.log(a);
    // console.log(user.get('stats.exercises'))
})

function toDateKey(date) {
    return date.toISOString().split('T')[0].replaceAll("-", "_");
}

module.exports = router;


