const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const userRoutes = require('./Routes/userRoutes');
const collectionRoutes = require('./Routes/collectionRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const cors= require('cors')

const {MONGO_KEY}= require('./config');
 
require("dotenv").config({
 path: path.join(__dirname, "./.env")
});


 
const app = express();
app.use(cors());
 
const PORT = process.env.PORT || 3010;

const mongoKey= process.env.MONGODB_KEY
 
mongoose
 .connect(mongoKey, {useNewUrlParser: true})
 .then(() => {
  console.log('Connected to the Database successfully');
 })
 .catch(err => console.log(err));
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); 
  next(); 

 } else { 
  next(); 
 } 
});


app.use('/collection', collectionRoutes);

app.use('/review', reviewRoutes);
 
app.use('/user', userRoutes);
app.get('/', (req, res) => res.send("Hi"));


app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})

