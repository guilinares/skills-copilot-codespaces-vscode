// Create web server 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var cors = require('cors');
var path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load data from json file
var comments = require('./comments.json');

// Get all comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Get comment by id
app.get('/api/comments/:id', function(req, res) {
  res.json(comments[req.params.id]);
});

// Add comment
app.post('/api/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
    res.json(comment);
  });
});

// Update comment
app.put('/api/comments/:id', function(req, res) {
  var comment = req.body;
  comments[req.params.id] = comment;
  fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
    res.json(comment);
  });
});

// Delete comment
app.delete('/api/comments/:id', function(req, res) {
  comments.splice(req.params.id, 1);
  fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
    res.json(comments);
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000...');
});

