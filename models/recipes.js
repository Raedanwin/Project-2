const mongoose = require(`mongoose`)

// Will come back to this later (might change it completely)
const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    calories: {type: Number, required: false},
    image: {type: String, required: true},
    ingredients: {type: String, }
})