const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const setHeader = require('./utils').setHeader;
//const passport = require('passport')
//const session = require('express-session');
//require('./passport')(passport)

const app = express();

app.use(bodyParser.json());
app.use(setHeader);
app.use('/', routes);

const port = 3000;
app.listen(port);
console.log('Web server is listening at port ' + port);
