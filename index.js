// 1 - Import express, create express server and import db methods
const express = require("express");
const server = express();
const User = require('./data/db')

// 2 - Configure the newly created server to parse JSON
server.use(express.json());

// 3 - Create endpoints

// 4 - Tell server to listen for incoming requests
server.listen(3000, () => {
    console.log('listening on 3000');
});