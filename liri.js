
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

//twitter api will diaplay most recent 20 tweets
if (command === "my-tweets"){
    // var queryURL = "https://api.twitter.com/1.1/search/tweets.json?q=nyx_the_grey&src=typd"
    var params = {screen_name: 'nyx_the_grey'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
            console.log("@nyx_the_grey:")
            for (var i=0; i<10; i++){
                console.log((i+1) + ". " + tweets[i].text);
            };
        }else{
            console.log("Error: " + error);
        }
    });

//============================================================================

//user input of "spotify-this-song" will use spotify api to search for song information
}else if (command === "spotify-this-song"){
    console.log("hi!");
    if (process.argv.length<=3){
        var song = "The+Sign"; //if no user specified movie, default is "Mr. Nobody"
    }else{
        var song = process.argv[3];
        if (process.argv.length>=4){ //builds movie title for url is title is more than one word
            for (var i=4; i<process.argv.length; i++){
                var song = song + "+" + process.argv[i];
            }
        }
    }
    console.log(song);
    // var queryUrl = "https://api.spotify.com/v1/search?q=" + song
    spotify.request('https://api.spotify.com/v1/tracks/')
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log("Error: " + err);
        });

//===========================================================================

//user input of "movie-this" will use OMBD api to search for movie information
}else if (command === "movie-this"){
    if (process.argv.length<=3){
        var movie = "Mr.Nobody"; //if no user specified movie, default is "Mr. Nobody"
    }else{
        var movie = process.argv[3];
        if (process.argv.length>=4){ //builds movie title for url is title is more than one word
            for (var i=4; i<process.argv.length; i++){
                var movie = movie + "+" + process.argv[i];
                console.log(movie);
            }
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(error, response, body){ //request to gather info from the api, logs it to the user
        if(!error && response.statusCode === 200){
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatos: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Cast: " + JSON.parse(body).Actors);
            // console.log(JSON.stringify(body));
        }
    });

//=============================================================================

}else if (command === "do-what-it-says"){

//validation that catches if the user typed something other than what is desired from the progeam
}else{
    console.log("Invalid command.")
};