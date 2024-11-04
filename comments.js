// Create web server
// Create a web server that can listen to requests for comments and post comments. 
// This server should have a /comments endpoint that accepts GET requests and returns a list of comments in the following JSON format:
// [
//     { "id": 1, "comment": "first comment" },
//     { "id": 2, "comment": "second comment" },
//     ...
// ]
// This server should also have a /comments endpoint that accepts POST requests and adds a new comment to the list of comments. 
// The POST request will have a JSON body that looks like this: { "comment": "This is a new comment." }

// You can use the comments.json file in the root of this repository as a starting point. 
// It contains an array of comments that you can read from and write to. 
// When the server starts, it should read the comments from this file and store them in memory. 
// When the server receives a POST request to add a new comment, it should write the new comment to this file.

// You can use the express package to create the web server. 
// You can install it using npm install express. 
// You can use the fs package to read and write the comments.json file. 
// You can install it using npm install fs.

// You can test the server by running it with node comments.js and then sending requests to it using curl or Postman.

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
    res.json(newComment);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})