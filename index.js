const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongodb-session')(session)

const cors = require('cors')

const AuthRoutes = require('./routes/authRouter')
const ExerciseRoutes = require('./routes/exerciseRouter')
const TrainingRoutes = require('./routes/trainingRouter')
const UserRoutes = require('./routes/userRouter')

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

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))

app.use('/auth', AuthRoutes)
app.use('/exercises', ExerciseRoutes)
app.use('/trainings', TrainingRoutes)
app.use('/users', UserRoutes)
app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`))
