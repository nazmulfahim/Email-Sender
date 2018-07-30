const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookiekey]
})
);
app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if ( process.env.NODE_ENV === 'production'){
	//express will serve up the assests
      app.use(express.static('client/build'));

	//express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req,res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

	});
}



const PORT = process.env.PORT || 5000

app.listen (PORT, function(){
console.log("Server is Running");
});