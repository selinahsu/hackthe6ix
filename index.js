const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/api/findrecipe', apiCall, ingredients_instructions_array, (req, res) => {
  const url = {id: req.body.params.url};
  if (!url) res.status(404).send('Oops! Something went wrong.');
  console.log("i am here");
  res.send({
    title: res.locals.title,
    ingredients: res.locals.ingredients,
    instructions: res.locals.instructions,
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
  res.locals.ingredients = response.data.extendedIngredients;
  res.locals.instructions = response.data.analyzedInstructions[0].steps;
  res.locals.imageurl = response.data.image;
  next();
}

async function save_to_sheet(ingredients, instructions) {
  const { GoogleSpreadsheet } = require('google-spreadsheet');

  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('1cs8drZgXBL59K-eeywnqOC0FDEK3wVc_2bC34zgH6n8');

  // use service account creds
  // process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  await doc.useServiceAccountAuth({
    client_email: "hack-the-6ix@hack-the-6ix-287300.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzr2i0D4Uy+tuo\nsy2dwMWoCUXTsvwvaZnJOvUfvhNTpGnQ+2/0DpV5WnsZK365bFllpY2/GswwfiaF\nG3ib2VXrlv80w+f8r4v8h4ARS2aNgktvNAig8t1IM1hwzd3Y8TvNLkG9aFieDU2s\nTleP6mOfHlcIDSZgK7zqiHJdre9XmbCmzn4kiQzsHwzloVpai+OyEObttiKJT6Qc\n+/VLZclXFOfFTJzvW4J8g5UupGXb86P/nqQTB4/e1Yd7dXZCKNe/0SBWcDQLURwL\n4L6WMQq2YKIE3wsLxQGAqas2iVHwU1BPl3sR6D+1JkuwoAPJQw7qaPjjVDRAM21T\nc5Bov8H3AgMBAAECggEAFDCtjy3/RY8yh246vfMfQpZoJjWCaMFw6k+Zo4t0GH3s\n9fKKzd2lphEoq9dbUfJ+yRElMEgOkZRbN7Gyh7CQGvzIiGFK+/WtwR5ooYjbaSMu\n3rv2DD+95ZL/aQ141BunIJMGCAZljrzn8WiMJjusHgEGvnzbxwqjG6dhUm1s62bF\nVz5AQu+Sh0kdZgIwGkLa8/zDC8nAbiXW/j2a+hRd16Ha9auuHBoIpPvRrci12cmQ\nzBeyE3GcKw2XTrmDL2rSnDCCEfTgoiPzHh/Ai9/0dwtilDxs8du3KQwarhKvCdAR\nhwXuwVVUuB+zNkR2YeZCBClb3WODj7ZvVwUX6s1WAQKBgQDgVyOY8CRhKo/HcbGi\nrbTqgzWi5JaMNs4gDUsfaQTXpaRyIo1fSg3ofTBLLFlxzdRqHodRS7aOtZiY27T3\npVjCAgT3dKaH4sVzyDPgqnKjjUT/VWZ0SvMUsZScSlV7zjs7t8O7mfQAuqDUcOmG\nQAupwAd7EvRZqvp0fvdkQ0z0NwKBgQDNCv0YDrcUXXPajNdy08+zR1cO5caVoWkA\nptKVX7CgEWXNHiLPzMorNG2d8T66rX/HhL3V7+5tmc+xJptM8AlxsOVjndOYKyrU\n1DFLF4dTT34HpwX3dLvrQLc0q36b/bFXgpINXWRAvFlolGiY2QL5c/ZrFcjOpqyP\nPJ9AUBhAQQKBgQCVv1TRp6qA+YoT1X5/Wngi+gZ5fyBG4+ZfWsBEbTOARt8oGIxJ\niQMTp0zvQOFLp9scItismV94jxsXHcEEdWhzyClMjJ8EoYivqnmGhAAV0By4W2cS\nRV1Q+OB8GtpI0/aR/C45MaDAQ9NLOzuGE4Y1fyr/Kj3VBN49mOrGEG5zrQKBgCeW\nQIkdhjFTXaPLX2lXBZm6Y0+IA1AuSqSKkMuwHty4nyv77oKqKjovNB6zTgYiqzHt\nKe2dFi5o7NVp+7/d9CTUH2WdOhX995YBpca2szTdexqlH5zIF+Pyqaxsk9QwJcYc\nenBEIK/y7Vwokw03kMByqBfCq/Nh8Jzy+lgjXptBAoGAVP0J7PAVQNERtWdD3KJ/\n16uAwlP9EVLS8Apzk+WLuRmy95aI9NHzdQdehzWNsVajg57GbBx1gq6SdOEp32yS\nSK+GcAdQiINS+symxkmF0dSEnRAdqCmhpjz6KuJrn01ndN18S0N+FB/E4BwJziUu\nhVYQ+Oz9LINWkSMfcalgkmw=\n-----END PRIVATE KEY-----\n",
  });

  await doc.loadInfo();
  console.log(doc.title);

  const sheet = doc.sheetsById[0];
  const rows = await sheet.getRows();
  for (let i = 0; i < ingredients.length; ++i) {
    rows[i].Ingredients = ingredients[i]; // update value
    await rows[i].save(); // save to sheet
  }
  for (let i = 0; i < instructions.length; ++i) {
    rows[i].Instructions = instructions[i]; // update value
    await rows[i].save(); // save to sheet
  }
}

function ingredients_instructions_array(req, res, next) { 
  // change the ingredients list to have only names, instead of detailed objects
  let ingredients = [];  
  for (let i = 0; i < res.locals.ingredients.length; i++) {
    ingredients[i] = res.locals.ingredients[i].name;
  }
  let instructions = [];
  for (let i = 0; i < res.locals.instructions.length; ++i) {
    instructions[i] = res.locals.instructions[i].step;
  }
  save_to_sheet(ingredients, instructions);
  // overwrite res.locals.ingredients
  res.locals.ingredients = ingredients; 
  console.log(res.locals.ingredients);
  // overwrite res.locals.instructions
  res.locals.instructions = instructions;
  console.log(res.locals.instructions);
  next();
}

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server started on port ${port}`));