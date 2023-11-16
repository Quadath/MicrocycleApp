const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongodb-session')(session)

const cors = require('cors')
const bodyParser = require('body-parser')

const ExerciseRoutes = require('./routes/exercises')

require('dotenv').config();

const app = express()
const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }, 
    store
}))

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))

app.use('/exercises', ExerciseRoutes)

app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`))
