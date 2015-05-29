var express = require('express');
var mp3skull = require('mp3skull');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.all('/search', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/search', function(req, res) {
  mp3skull(req.query.q, function (err, tracks) {
    res.json({
			info: {
				num_results: tracks.length,
				query: req.query.q
			},
			tracks: tracks
		});
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
