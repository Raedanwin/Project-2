const mongoose = require(`mongoose`)

// Will probably have to add more to this //
const ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: false},
    cost: {type: String, required: false},
    amount: {type: Number, require: true},
})

const Ingredient = mongoose.model(`Ingredient`, ingredientSchema)

module.exports = Ingredient