// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require(`express-session`)
const fetch = require("node-fetch");
// CONFIGURATION
require(`dotenv`).config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI
const SECRET = process.env.SECRET

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

// DATABASE
mongoose.connect(
  mongodbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log('the connection with mongod is established at', mongodbURI)
  }
)

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Controllers
const pantryController = require('./controllers/pantry_controller.js')

const recipeController = require(`./controllers/recipe_controller.js`)
// const { response } = require('express')

const searchController = require(`./controllers/searchController.js`)


// Routes
app.get('/', (req, res) => {
  res.redirect('/pantry')
})
app.use('/pantry', pantryController)

app.get(`/`, (req, res) => {
  res.redirect(`/recipes`)
})
app.use(`/recipes`, recipeController)

app.get(`/`, (req, res) => {
  res.redirect(`/search`)
})
app.use(`/search`, searchController)

// Listener
app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
