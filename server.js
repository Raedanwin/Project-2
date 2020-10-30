// DEPENDENCIES
const express = require(`express`)
const methodOverride = require(`method-override`)
const mongoose = require(`mongoose`)
const session = (`express-session`)

// CONFIGURATION
require(`dotenv`).config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.mongodbURI

// MIDDLEWARE
app.use(methodOverride(`_method`))
app.use(express.urlencoded( {extended: true} ))

// DATABASE
mongoose.connect(
    mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => {
        console.log(`the connection with mongod is established at`, mongodbURI)
    }
)

app.use(
    session({
        key: process.env.APIKEY,
        resave: false,
        saveUninitialized: false
    })
)

