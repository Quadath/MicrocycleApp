const UserSchema = require('../models/user')
const {Router} = require('express')

const router = Router()

router.get('/', async (req, res) => {
    const user = new UserSchema({
        name: "test",
        username: "qafafafs",
        hashPassword: "sfasfq31gasg",
    })
    
    user.set(`stats.exercises.${"65ad6995beb43c92d10585da"}`, {date: new Date(), weight: 100, cycles: 3, repeats: 5} )
    
    console.log(user.get('stats.exercises'))
    await user.save();
})

module.exports = router;


