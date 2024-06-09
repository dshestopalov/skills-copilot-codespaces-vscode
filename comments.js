// Create web server
// Purpose: Create a web server that listens on port 3000
// Request: GET, POST, DELETE
// Response: JSON

// Import express
const express = require('express');
const app = express();
// Import body-parser
const bodyParser = require('body-parser');
// Import fs
const fs = require('fs');
// Import path
const path = require('path');
// Import uuid
const { v4: uuidv4 } = require('uuid');

// Use body-parser
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const comments = JSON.parse(data);
    newComment.id = uuidv4();
    comments.push(newComment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.send(newComment);
    });
  });
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    let comments = JSON.parse(data);
    comments = comments.filter(comment => comment.id !== id);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.send('Deleted comment');
    });
  });
});

// Listen to port 3000
app.listen(3000, () => {