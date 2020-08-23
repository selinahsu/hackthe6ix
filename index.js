const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/api/findrecipe', apiCall, processJSON, (req, res) => {
  const url = {id: req.body.params.url};
  if (!url) res.status(404).send('Oops! Something went wrong.');
  console.log("i am here");
  res.send({
    title: res.locals.title,
    ingredients: res.locals.ingredients,
    imageurl: res.locals.imageurl,
  });
}); 


/***************** Middleware *****************/

async function apiCall(req, res, next) { 
  const apiKey = "c6b333896abc44b690a2b64b3d865f60";
  const url = req.body.params.url;
  const response = await axios({
    url: `https://api.spoonacular.com/recipes/extract?apiKey=${apiKey}&url=${url}`,
    method: 'get'
  }).catch(function (error) {
    console.log(error);
  });
  res.locals.title = response.data.title;
  // res.locals.ingredients stores the API=provided array of extendedIngredients objects
  res.locals.ingredients = response.data.extendedIngredients;
  res.locals.imageurl = response.data.image;
  next();
}

function processJSON(req, res, next) { 
  let ingredients = [];  
  for (let i = 0; i < res.locals.ingredients.length; i++) {
    ingredients[i] = res.locals.ingredients[i].name;
  }

  // overwrite res.locals.ingredients with just a list of ingredient names
  res.locals.ingredients = ingredients; 
  console.log(res.locals.ingredients);
  next();
}

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server started on port ${port}`));