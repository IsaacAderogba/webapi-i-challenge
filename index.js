// 1 - Import express, create express server and import db methods
const express = require("express");
const server = express();
const User = require('./data/db')

// 2 - Configure the newly created server to parse JSON
server.use(express.json());

// 3 - Create endpoints
server.get('/api/users', (req, res) => {
    res.json('get users endpoints')
});

server.get('/api/users/:id', (req, res) => {
    res.json('get users by id endpoint')
})

server.post('/api/users/', (req, res) => {
    res.json('post to users')
})

server.delete('/api/users/:id', (req, res) => {
    res.json('delete user by Id')
})

server.put('/api/users/:id', (req, res) => {
    res.json('put user by Id')
})

// 4 - Tell server to listen for incoming requests
server.listen(3000, () => {
    console.log('listening on 3000');
});