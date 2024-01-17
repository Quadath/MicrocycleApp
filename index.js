const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongodb-session')(session)
const headers = require('./middleware/headers')

const cors = require('cors')

const AuthRoutes = require('./routes/auth')
const ExerciseRoutes = require('./routes/exercises')
const TrainingRoutes = require('./routes/trainings')

require('dotenv').config();

const app = express()
const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URI
})

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    proxy: true,
    name:"app",
    cookie: {
        httpOnly: true,
    },
    store
}))
app.use(cors({credentials: true, origin: 'http://localhost:4000'}));
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     next()
//   })

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))

app.use('/auth', AuthRoutes)
app.use('/exercises', ExerciseRoutes)
app.use('/trainings', TrainingRoutes)
app.use('/auth', AuthRoutes)

app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`))
