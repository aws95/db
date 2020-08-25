const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//middleweare to parse all the data going to database + always before routes
app.use(cors());
app.use(bodyParser.json());

//import routes

const embededRoute = require("./routes/embeded/model");
const vetRoute = require("./routes/embeded/vetements");
const chauRoute = require("./routes/embeded/chaussures");
const refRoute = require("./routes/referenced/refe");

app.use("/model", embededRoute);
app.use("/vetements", vetRoute);
app.use("/chaussures", chauRoute);
app.use("/referenced", refRoute);

dotenv.config();

//connect to database

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database")
);

//creating routes

app.get("/", (req, res) => {
  res.send("we are on !");
});

//start listening to the server

app.listen(9000);
