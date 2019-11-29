var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.get("/", function (req, res) {
    res.send('Welcome to timestamp server')
});

app.get('/api/timestamp/', function(req, res) {
    let date = new Date();
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.get('/api/timestamp/:date', function(req, res) {
    if (Number.isInteger(parseInt(req.params.date, 10)) && parseInt(req.params.date, 10) >= 10000) {
      res.json({
          unix: parseInt(req.params.date, 10),
          utc: new Date(parseInt(req.params.date, 10)).toUTCString()
      });
      return;
    }

    let date = new Date(req.params.date);
    if (isNaN(date.getTime())) {
        res.json({error: 'Invalid Date'});
        return;
    }
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});