const express = require(`express`)
const Ingredient = require(`../models/ingredients.js`)
const router = express.Router()

// routes

// index
router.get(`/`, (req, res) => {
    Ingredient.find({}, (error, allIngredients) => {
        res.render(`pantry/index.ejs`, {
            ingredients: allIngredients
        })
    })
})

// new
router.get(`/new`, (req, res) => {
    res.render(`pantry/new.ejs`)
})

// create
router.post(`/`, (req, res) => {
    Ingredient.create(req.body, (error, createdIngredient) => {
        res.redirect(`/pantry`)
    })
})