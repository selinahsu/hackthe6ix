const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
  })
);

app.post('/api/distance', (req, res) => {
  const destination = {id: req.body.params.destination};
  if (!destination) res.status(404).send('Oops! Something went wrong.');
  console.log("i am here");
  res.send({
    distance: res.locals.distance,
    emissions: res.locals.emissions,
    fuel: res.locals.fuel
  });
});


const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server started on port ${port}`));




// app.post('/api/result', (req, res) => {
//   if (req.body.params.inputValue == 'hello world')
//     res.json({
//       id: true,
//       description: "true"
//     });
//   else 
//     res.json({
//       id: false,
//       description: "false"
//     });
// });