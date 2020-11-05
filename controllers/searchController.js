const express = require(`express`)
const router = express.Router()
const fetch = require("node-fetch");
const SECRET = process.env.SECRET

// routes

router.get(`/`, (req, res) => {
    res.render(`../views/search/search.ejs`)
})
  
router.post(`/`, (req, res) => {
    let search = req.body.search
  
    function getSearch(){
      let route = "https://api.spoonacular.com/recipes/complexSearch?query="+search+"&apiKey="+SECRET+""
      fetch(route).then(response =>{return response.json()}).then(data=>{res.render(`../views/search/resultPage.ejs`,{result:data.results})}).catch(err=>{console.log(err)})
}
  getSearch()
})

module.exports = router