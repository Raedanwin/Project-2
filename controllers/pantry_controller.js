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

// seed
router.get(`/seed`, (req, res) => {
    Ingredient.create(
        [
            {
                name: `apple`,
                cost: .25,
                amount: 8
            },
            {
                name: `chicken`,
                cost: 5.00,
                amount: 7
            },
            {
                name: `pasta`,
                cost: 3.00,
                amount: 150
            }
        ],
        (error, data) => {
            res.redirect(`/pantry`)
        }
    )
})

// edit
router.get(`/:id/edit`, (req, res) => {
    Ingredient.findById(req.params.id, (error, foundIngredient) => {
        res.render(`pantry/edit.ejs`, {
            ingredient: foundIngredient
        })
    })
})

// put
router.put(`/:id`, (req, res) => {
    Ingredient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect(`/pantry`)
        }
    )
})

// show
router.get(`/:id`, (req, res) => {
    Ingredient.findById(req.params.id, (error, foundIngredient) => {
        res.render(`pantry/show.ejs`, {
            ingredient: foundIngredient
        })
    })
})

// delete
router.delete(`/:id`, (req, res) => {
    Ingredient.findByIdAndRemove(req.params.id, (error, deletedIngredient) => {
        res.redirect(`/pantry`)
    })
})

module.exports = router