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
const secret = process.env.SECRET

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
const { response } = require('express')


// Routes
app.get('/', (req, res) => {
  res.redirect('/pantry')
})
app.use('/pantry', pantryController)

app.get(`/`, (req, res) => {
  res.redirect(`/recipes`)
})
app.use(`/recipes`, recipeController)

// SEARCH ROUTES (will move later)
app.get(`/search`, (req, res) => {
  res.render(`../views/search.ejs`)
})

app.post(`/search`, (req, res) => {
  let search = req.body.search
  
  // fetch(route)
  // .then(response => response.json())
  // .then(data => console.log(data));
function getSearch(){
  let route = "https://api.spoonacular.com/recipes/complexSearch?query="+search+"&apiKey=74773f7220eb40d08a371c9c65b48a6d"
  fetch(route).then(response =>{return response.json()}).then(data=>{res.render(`../views/resultPage.ejs`,{banana:JSON.stringify(data.results)})}).catch(err=>{console.log(err)})
}
getSearch()

})
// Listener
app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
