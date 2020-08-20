const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//const methodOverride = require("method-override");
//const path = require("path");



//middleweare to parse all the data going to database + always before routes 
app.use(cors());
app.use(bodyParser.json());
//app.use(methodOverride("_method"));
//app.set("view engine", "ejs");

//import routes

const modelRoute = require('./routes/model');
const vetRoute = require('./routes/vetements');
const chauRoute = require('./routes/chaussures');

app.use('/model', modelRoute);
app.use('/vetements', vetRoute);
app.use('/chaussures', chauRoute);

dotenv.config();

//connect to database 

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to database'));

//creating routes 

app.get('/', (req, res) => {
    res.send('we are on !');
});



//start listening to the server 

app.listen(3000);