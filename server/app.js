const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('./helper/jwt');
const error = require('./helper/error');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// app.use(jwt());

app.use('/user', require('./users/users.controler'));

app.use(error);

const port = process.env.port||4000;
const server = app.listen(port, function(){
    console.log('Server is lisitening on port ' + port);
})