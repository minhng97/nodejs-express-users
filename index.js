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
app.use(cookieParser()) // view the cookie

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// The app responds with “AAA” for requests to the root URL (/), it renders the index.pug file
app.get('/', (req, res) => res.render('index', {
	name: "AAA"
}));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use(express.static('public'))
app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`);
});