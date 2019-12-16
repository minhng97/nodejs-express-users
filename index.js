require('dotenv').config()
console.log(process.env.SESSION_SECRET)
const express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var cookieParser = require('cookie-parser')

const authMiddleware = require('./middlewares/auth.middleware')
const port = 3000;

const app = express();
app.set('view engine', 'pug') //set the view engine
app.set('views', './views') //set the pug folder

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('abcDefGhj123')) // view the cookie

// The app responds, it render index.pug plus an object with name: “AAA” for requests to the root URL (/)
app.get('/', (req, res) => res.render('index', {
	name: "AAA"
}));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use(express.static('public'))
app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`);
});