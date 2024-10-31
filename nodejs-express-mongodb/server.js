const express = require("express");
const cors = require("cors");
var mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Football application." });
});

require("./app/routes/teams.routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const db = require("./app/models");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err.message));