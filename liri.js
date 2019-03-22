require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');









var userarr = process.argv;
var userinput = userarr[3];
var action = userarr[2];
for (i = 4; i < userarr.length; i++) {
    userinput += "+" + userarr[i];
    console.log(userinput);
};
console.log(userinput);

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

  
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + userinput + "&y=&plot=short&apikey=trilogy";
    
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
        

      }
    );
}


function concert() {

    
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + userinput + "/events?app_id=codingbootcamp";

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
    
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
   
   
    spotify
        .search({ type: 'track', query: userinput,limit:1 })
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
        action = dataArr[0];
        userinput = dataArr2[0]
        for (i = 1; i < dataArr2.length; i++) {
            userinput += "+" + dataArr2[i];
        }
        console.log(userinput);
        console.log(action);
        randomizer();
        })
        
}
    
    
    
    


            










