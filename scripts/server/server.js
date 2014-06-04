// set up ======================================================================
var express  = require('express');
var app      = express();                 // create our app w/ express
var mongoose = require('mongoose');           // mongoose for mongodb
var Schema = mongoose.Schema;
var ActiveDirectory = require('activedirectory');
yaml = require('js-yaml');
fs   = require('fs');

var port = 2080;
var doc = yaml.safeLoad(fs.readFileSync('config/ad.yml', 'utf8'));

// configuration ===============================================================

mongoose.connect('mongodb://picker:picker@ds027789.mongolab.com:27789/central');   // connect to mongoDB database 

app.configure(function() {
  app.use(express.logger('dev'));             // log every request to the console
  app.use(express.bodyParser());              // pull information from html in POST
  app.use(express.methodOverride());            // simulate DELETE and PUT
});


var authkey = { url: doc.url,
                baseDN: doc.base_dn,
                username: doc.username,
                password:  doc.password};

var ad = new ActiveDirectory(authkey);
var ad_users = [];
var doneLoading = false;

ad.findUsers("", true, function(err, users) {
  if (err) {
    console.log('ERROR: ' + JSON.stringify(err));
    return;
  }

  if ((! users) || (users.length == 0)) console.log('No users found.');
  else {
    users.forEach(function(user){
      ad_users.push({name: user.cn, lastWin: ''});
    });

    doneLoading = true;
  }
});

// define model ================================================================
var user_schema = new Schema({
  name : String,
  lastWin : Date
});
var user = mongoose.model('user', user_schema);

// routes ======================================================================

  // api ---------------------------------------------------------------------
  // get all users
  app.get('/api/users', function(req, res) {
      if(doneLoading)
      {
        res.writeHead(200, { 'Content-Type': 'application/json' });
     
        // use mongoose to get all users in the database
        user.find(function(err, users) {
          // if there is an error retrieving, send the error. 
          if (err)
            res.send(err)

         var allUsers = _.union(ad_users,users);
         var finalUsers = _.uniq(allUsers);

         res.end(JSON.stringify(finalUsers));        
        }); 
     }
     else
     {
      res.json({status: "processing"});
     } 
 });

  // create user and send back all users after creation
  app.post('/api/users', function(req, res) {
    console.log(res);
    user.create(
      { name : req.body.name,
        lastWin : req.body.lastWin },
      function(err, user) {
        if (err)
          res.send(err); 
    });

  });

  // delete a user
  app.delete('/api/users/:user_name', function(req, res) {
      console.log(req);
      user.remove(
       {
        name : req.params.user_name
       }, 
       function(err, todo) {
         if (err)
           res.send(err);
      });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./templates/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

// listen (start app with node server.js) ======================================
var http = require('http');
http.createServer(app).listen(port);
console.log("App listening on port " + port);
