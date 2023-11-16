const {Router} = require('express')

const router = Router()

module.exports = router;

router.get('/', (req,res) => {
    res.send('List of exercises')
})

router.post('/post', (req,res) => {
    const {name, description} = req.body;

    console.log(name);
})