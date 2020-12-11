const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
// const hbs          = require('hbs');
// const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

require("./configs/db.configs");

require("./configs/passport.configs");

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.locals.title = 'Welcome to Bookly';

const index = require('./routes/index');
app.use('/', index);
app.use("/", require("./routes/bookclub.routes"));
app.use("/", require("./routes/auth.routes"));
app.use('/', require ("./routes/meeting.routes"));
app.use('/', require ("./routes/currentBook.routes"));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("bookly-frontend/build"));

  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../bookly-frontend", "build", "index.html"));
  });
}


module.exports = app;
