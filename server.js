// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://localhost:27017/library');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Book = require('./models/bookModel');

//routes
bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter); 

/**********************************************************************************************/

// Models
var User = require('./models/userModel');

//routes
userRouter = require('./routes/userRoutes')(User);
app.use('/api/users', userRouter); 

/*  
    // Get users
    app.get('/api/users', function(req, res) {
 
        console.log("fetching users");
 
        // use mongoose to get all users in the database
        userCollection.find(function(err, users) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(users); // return all users in JSON format
        });
    });

    // validate user
    app.get('/api/user', function(req, res) {
        
               console.log("fetching users");

                console.log("req.query.email: "+req.query.email);
               // use mongoose to get user in the database
               userCollection.find({ 
                                        email: req.query.email
                                    }, 
                                    function(err, users) {
        
                   // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                   if (err)
                       res.send(err)
                    console.log(users);

                   res.json(users); // return user info in JSON format
               });
           });
 
    // create user and send back all users after creation
    app.post('/api/users', function(req, res) {
 
        console.log("creating user");
 
        // create a user, information comes from request from Ionic
        userCollection.create(
            req.body
        //      {
        //     username : req.body.username,
        //     email : req.body.email,
        //     password : req.body.password,
        //     info : req.body.info
        // } 
        , function(err, user) {
            if (err)
                res.send(err);
 
            // get and return all the users after you create another
            userCollection.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
 
    });


    // update user and send back all users after creation
    app.put('/api/users/:user_id', function(req, res) {
 
        console.log("updating user: "+req.params.user_id);
 
        // update a user, information comes from request from Ionic

        var conditions = {
                            _id : req.params.user_id
                        }
              , update = {$set:{
                                username : req.body.username,
                                email : req.body.email,
                                password : req.body.newPassword,
                                info : req.body.info
                            }}
              , options = { multi: true, upsert: true };

        userCollection.update(conditions, update, options,
             function(err, user) {
                if (err)
                    res.send(err);
     
                // get and return all the users after you create another
                userCollection.find(function(err, users) {
                    if (err)
                        res.send(err)
                    res.json(users);
                });
            });
 
    });
 
    // delete a user
    app.delete('/api/users/:user_id', function(req, res) {
        userCollection.remove({
            _id : req.params.user_id
        }, function(err, user) {
 
        });
    });
 
  */
 
 
// listen (start app with node server.js) ======================================
app.listen(8200);
console.log("App listening on port 8200");