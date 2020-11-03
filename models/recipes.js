const mongoose = require(`mongoose`)

// Will come back to this later
const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    calories: {type: Number, required: false},
    image: {type: String, required: false},
    ingredients: {type: Array, required: true}
})

const Recipe = mongoose.model(`Recipe`, recipeSchema)

module.exports = Recipe