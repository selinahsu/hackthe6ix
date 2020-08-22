const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

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

// Members API Routes
//app.use('/api/members', require('./routes/api/members'));


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