require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const logger       = require('morgan');
const path         = require('path');
const flash        = require("connect-flash");
const axios        = require('axios')
const expressHbs   = require('express-handlebars');


//Set axios defaults
axios.defaults.baseURL = 'http://api.vedicrishiastro.com/v1/'
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN

// Set up the database
require('./configs/db.config');

// Routers
const index = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const makeAMatchRoutes = require('./routes/make-a-match');
const matchesRoutes = require('./routes/matches');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));  

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('idCheck', function (idmatch, iduser) {
  if (JSON.stringify(idmatch) == JSON.stringify(iduser)) {
    return true
  } else {
    return false
  }
})


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
require('./configs/session')(app)
app.use(flash());
require('./configs/passport')(app)

// Routes middleware
app.use('/', index);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', makeAMatchRoutes);
app.use('/', matchesRoutes); 

module.exports = app;
