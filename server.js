
var path = require('path'),
    express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {  
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});


function tweetIt(txt) {
  app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {
    T.post('statuses/update', { status: txt }, function(err, data, response) {
      if (err){
        console.log('error!', err);
        res.sendStatus(500);
      }
      else{
        res.sendStatus(200);
      }
    });
  });
};

var stream = T.stream('user');




/*

stream.on('follow',followed);

function followed(followEventMsg) {
  console.log('follow event');
  var screenName = followEventMsg.source.screen_name;
  tweetIt('@' + screenName + ' how to use'); /* TODO */ 

/*

};



stream.on('tweet',mentioned);

function replyTweetIt(txt, id) {
  app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {
    T.post('statuses/update', { status: txt , in_reply_to_status_id : id}, function(err, data, response) {
      if (err){
        console.log('error!', err);
        res.sendStatus(500);
      }
      else{
        res.sendStatus(200);
      }
    });
  });
};

function mentioned(mentionEventMsg) {
  console.log('mention event');
  /*var fs = require('fs');
  var json = JSON.stringify(mentionEventMsg,null,2);
  fs.writeFile("tweet.json", json);*/

/*

  var replyTo = mentionEventMsg.in_reply_to_screen_name;
  var text = mentionEventMsg.text;
  var from = mentionEventMsg.user.screen_name;
  var tweetID = mentionEventMsg.id_str;
  
  if (replyTo === 'sbotify_') {
    console.log('good mention');
    var newTweet = '@' + from + ' replyyyy';
    replyTweetIt(newTweet,tweetID);
  };
  
};

*/
