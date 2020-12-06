//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




const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors');
const userRoutes = require("./api/routes/users");
const complaintRoutes= require("./api/routes/complaint");
mongoose.connect('mongodb+srv://malikmanik41:1234567890@cluster0.koktt.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true,  
  useUnifiedTopology: true 
} ).then(()=> console.log("DB connection Established"))
.catch(err => console.log("DB connection error"+ err));

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/users", userRoutes);
app.use("/complaint", complaintRoutes);

//test area 



if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
