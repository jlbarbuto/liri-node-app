// import { twitter } from "./keys";

require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");

// console.log(keys);

// var client = new Twitter(keys.twitter);

var command = process.argv[2];

if (command === "my-tweets"){
    // var queryURL = "https://api.twitter.com/1.1/search/tweets.json?q=nyx_the_grey&src=typd"

}else if (command === "spotify-this-song"){

}else if (command === "movie-this"){
    if (process.argv.length<=3){
        var movie = "Mr.Nobody";
    }else{
        var movie = process.argv[3];
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(error, response, body){
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

}else if (command === "do-what-it-says"){

}else{
    console.log("Invalid command.")
};