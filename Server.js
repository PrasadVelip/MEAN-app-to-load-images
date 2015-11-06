var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/mongo");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false
}));

router.get("/", function(req, res) {
  res.json({
    "error": false,
    "message": "Hello World-"
  });
});

router.route("/") // to fetch data initially
  .get(function(req, res) {
    var response = {};
    mongoOp.find({}, function(err, data) {
      if (err) {
        response = {
          "error": true,
          "message": "Error fetching data"
        };
      } else {
        response = {
          "error": false,
          "message": data
        };
      }
      res.json(response);
    });
  })
  .post(function(req, res) {            // to insert lable and img
    var db = new mongoOp();
    var response = {};
    db.labels = req.body.addlabel;
   
     db.img = require('crypto').update(req.body.addimg).digest('base64');
    db.save(function(err) {
      if (err) {
        response = {
          "error": true,
          "message": "Error adding data"
        };
      } else {
        response = {
          "error": false,
          "message": "Data added"
        };
      }
      res.json(response);
    });
  });


  
 

app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");
