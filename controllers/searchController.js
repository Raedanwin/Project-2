const express = require(`express`)
const router = express.Router()
const fetch = require("node-fetch");
const { route } = require("./pantry_controller");
const SECRET = process.env.SECRET

// routes

router.get(`/`, (req, res) => {
    res.render(`../views/search/search.ejs`)
})
  
router.post(`/`, (req, res) => {
    let search = req.body.search
  
    function getSearch(){
      let route = "https://api.spoonacular.com/recipes/complexSearch?query="+search+"&apiKey="+SECRET+""
      fetch(route).then(response =>{return response.json()}).then(data=>{res.render(`../views/search/resultPage.ejs`,{result:data.results, SECRET: SECRET})}).catch(err=>{console.log(err)})
}
  getSearch()
})
router.get(`/modifiedSearch/:id`,(req,res)=>{
    let id= req.params.id
    console.log(id)
    function getRecipe(){
      let route = 'https://api.spoonacular.com/recipes/'+id+'/information?includeNutrition=false&apiKey='+SECRET+''
      fetch(route).then(response =>{return response.json()}).then(data=>{res.render(`../views/recipe_book/show.ejs`,{recipe:data, SECRET: SECRET})}).catch(err=>{console.log(err)})
    }
    getRecipe()
})
module.exports = router