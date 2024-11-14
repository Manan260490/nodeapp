const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const userController = require('./controller');
const serverless = require('serverless-http');
const app = express();
const PORT=3001;
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(bodyParser.json());
db.connectToDB();
app.post('/signup', userController.signupUser);
app.post('/login', userController.loginUser);
app.post('/contact', userController.Contact);
app.post('/booking', userController.createBooking);
app.post('/createcar', userController.createCarBrand);
app.get('/getcar', userController.getAllCarBrands);
app.get('/gettype',userController.getAllCarTypes);
app.post('/createtype',userController.createCarType);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports.handler = serverless(app);
