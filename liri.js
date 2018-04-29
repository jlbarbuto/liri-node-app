//require npm packages and other documents
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");
var fs = require("fs"); 

//VARIABLES ===============================================================
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var arr = [];
var arrString = ""
for (i=3; i<process.argv.length; i++){
    arr.push(process.argv[i]);
}
for (i=0; i<arr.length; i++){
    arrString += arr[i] + " ";
}
 
// FUNCTIONS ==============================================================
function twitterFunction(){
    // var queryURL = "https://api.twitter.com/1.1/search/tweets.json?q=nyx_the_grey&src=typd"
    var params = {screen_name: 'nyx_the_grey'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
            console.log("@nyx_the_grey:")
            for (var i=0; i<20; i++){
                console.log((i+1) + ". " + tweets[i].text);
            };
        }else{
            console.log("Error: " + error);
        }
    });
}

function spotifyFunction(){
    if (process.argv.length<=3 && command==="spotify-this-song"){
        var song = "The+Sign"; //if no user specified movie, default is "The Sign"
    }else{
        var song = arrString;
    }
    
    spotify.search({type:"track", query:song}, function(error,data){
        if(error){
            console.log("Error: " + error);
        }
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Artist: " + (data.tracks.items[0].album.artists[0].name));
        console.log("Link: " + data.tracks.items[0].album.external_urls.spotify);
        console.log("Album Title: " + data.tracks.items[0].album.name);
    
    });
};

function movieFunction(){
    if (process.argv.length<=3){
        var movie = "Mr.Nobody"; //if no user specified movie, default is "Mr. Nobody"
    }else{
        var movie = arrString;
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
       }
    });
}

//MAIN PROCESS ===========================================================

//twitter api will diaplay most recent 20 tweets
if (command === "my-tweets"){
    twitterFunction();

//user input of "spotify-this-song" will use spotify api to search for song information
}else if (command === "spotify-this-song"){
    spotifyFunction();

//user input of "movie-this" will use OMBD api to search for movie information
}else if (command === "movie-this"){
    movieFunction();
    
}else if (command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log("Error: " + error);
        }
        var txtArr = data.split(",");
        for (i=0; i<txtArr.length; i++){
        }
        if (txtArr[0]==="spotify-this-song"){
            arrString = txtArr[1];
            spotifyFunction();

        }else if (txtArr[0]==="my-tweets"){
            twitterFunction();

        }else if (txtArr[0]==="movie-this"){
            arrString = txtArr[1];
            movieFunction();

        }else{
            console.log("Invalid txt command.");
        }
    });

//validation that catches if the user typed something other than what is desired from the progeam
}else{
    console.log("Invalid command.")
};
