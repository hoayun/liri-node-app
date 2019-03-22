require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');











var action = process.argv[2];

function randomizer(){
switch(action){

case "concert-this":
      concert();
 break;

case "spotify-this-song":
     spotify();
 break;

case "movie-this":
      movie();
 break;

case "do-what-it-says":
     says();
 break;
}}
randomizer();
function movie() {

    var value = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";
    
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (i = 3; i < value.length; i++) {
        movieName += value[i] + '+';
    };
    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.imdbRating);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Plot);

      }
    );
}






function concert() {

    var value = process.argv;

    // Create an empty variable for holding the movie name
    var artist = "";
    
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (let i = 3; i < value.length; i++) {
        if (i > 3 && i <value.length) {
            artist = artist + "+" + value[i];
    } else {
            artist += value[i];
        }
    }
    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
      function(response) {
          for (i=0; i < response.data.length; i++){

         
        //  console.log(response.data);
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city);
          console.log("Date of event: " + moment(response.data[i].datetime).format("L"));
          }

       

      }
    );
}

function spotify(){
    var toSearch = process.argv;
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var song = "";
    for (let i = 3; i < toSearch.length; i++) {
        if (i > 3 && i <toSearch.length) {
            song = song + "+" + toSearch[i];
    } else {
            song += toSearch[i];
        }
    }
    spotify
        .search({ type: 'track', query: song,limit:1 })
        .then(function(response) {
            console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("Song Preview: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name);
    })
        .catch(function(err) {
            console.log(err);
        });
};
function says() {
    console.log("yes");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
          }
        var dataArr = data.split(",");
        console.log(dataArr);
        var dataArr2 = dataArr[1].split(" ");
        
        console.log(dataArr2);
        userRequest = dataArr[0];
        action = dataArr2[0]
        for (i = 1; i < dataArr2.length; i++) {
            action += "+" + dataArr2[i];
        }
        console.log(userRequest);
        console.log(action);
        randomizer();
        })
        
}
    
    
    
    


            










