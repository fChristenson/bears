
/**
 * Module dependencies.
 */

var express = require('express');
var Bear = require('./model/bear.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eTut');

var app = express();
app.use(bodyParser());

// all environments
app.set('port', process.env.PORT || 3000);

// routes **************************************************
app.get('/', function (req, resp) {
    resp.json({message: "Json works!"});
});

app
.delete('/bears/:bearId', function (req, resp) {
    Bear.remove({_id: req.params.bearId}, function (err) {

        if (err) {
            resp.send(err);
        }

        resp.json({message: "Bear deleted"});
    });
})
.put('/bears/:bearId', function (req, resp) {
    Bear.findById(req.params.bearId, function (err, bear) {

        if (err) {
            resp.send(err);
        }

        bear.name = req.body.name;
        bear.save(function (err) {
            if (err) {
                resp.send(err);
            }

            resp.json({message: 'Bear updated!'});
        })
    });
})
.get('/bears/:bearId', function (req, resp) {
    Bear.findById(req.params.bearId, function (err, bear) {

        if (err) {
            resp.send(err);
        }

        resp.json(bear);
    });
})
.get('/bears', function (req, resp) {
    Bear.find(function (err, bears){

        if (err) {
            resp.send(err);
        }

        resp.json(bears);
    });
})
.post('/bears', function (req, resp) {
    var bear = new Bear();
    bear.name = req.body.name;
    
    bear.save(function (err) {
        if (err){
            resp.send(err);
        }

        resp.json({message: "Bear created!"});
    });
});

//***********************************************************

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
