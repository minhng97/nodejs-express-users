require('dotenv').config()

const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf'); // for CSRF attack in transfer/create
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

const authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

const port = 3000;

const app = express();
app.set('view engine', 'pug'); //set the view engine
app.set('views', './views'); //set the pug folder


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)) // view the cookie
app.use(sessionMiddleware);


app.use(express.static('public'));

// The app responds, it render index.pug plus an object with name: “AAA” for requests to the root URL (/)
app.get('/', (req, res) => {
	res.render('index', {
	name: "AAA" }
)});

app.get('/logout', (req, res) => { 
	res.clearCookie('userId');
	res.redirect('/users'); });
app.use('/users',
  authMiddleware.requireAuth,
  userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use(csurf({ cookie: true }));
app.use('/transfer', authMiddleware.requireAuth, transferRoute);


app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`);
});