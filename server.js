const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express()

//bodyParser Middleware
app.use(bodyParser.json())

// DB config
const db = require('./config/key').mongoURI;

// Connect to mongodb
mongoose
  .connect(db, { useUnifiedTopology: true , useNewUrlParser: true })
  .then(()=> console.log('MongoDB Connected.....'))
  .catch(()=> console.log(err))

// Use routes
app.use('/api/items', items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log('Server start on port ' + port))
