const express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route')

var cookieParser = require('cookie-parser')

const port = 3000;

const app = express();
app.set('view engine', 'pug') //set the view engine
app.set('views', './views') //set the pug folder
app.use(cookieParser())

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// The app responds with “AAA” for requests to the root URL (/), it renders the index.pug file
app.get('/', (req, res) => res.render('index', {
	name: "AAA"
}));

app.use('/users', userRoute);
app.use(express.static('public'))
app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`);
});