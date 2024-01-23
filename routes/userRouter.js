const UserSchema = require('../models/user')
const {Router} = require('express')

const router = Router()

router.get('/', async (req, res) => {
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


