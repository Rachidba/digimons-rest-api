// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var config = require('./config'); // get our config file    

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Tweet = require('./app/models/tweet');

mongoose.connect(config.database);
var port = process.env.PORT || 8085;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /tweets
// ----------------------------------------------------
router.route('/tweets')
    // get all the tweets
    .get(function(req, res) {
        Tweet.find(function(err, tweets) {
            if (err)
                res.send(err);
            res.json(tweets);
        });
    })
    .post(function(req, res) {
        var tweet = new Tweet();
        tweet.Nom = req.body.nom;
        tweet.Text = req.body.text;
        tweet.Date = req.body.date;
        tweet.Geolocalisation = req.body.geolocalisation;

        tweet.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Tweet created !'});
        });
    });

// on routes that end in /tweets/:days
// ----------------------------------------------------
router.route('/tweets/:days')
    // get the 
    .get(function(req, res) {
        Tweet.find(function(err, tweets) {
            if (err)
                res.send(err);
            res.json(tweets);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);