require("dotenv").config();
// Dependencies
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var request = process.argv[2];
var searchTerm = process.argv[3];


// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (request) {
    case "concert-this": // searches for bands in town
        concertThis(searchTerm);
        break;

    case "spotify-this-song": // searches for song on spotify
        spotifyThis(searchTerm);
        break;

    case "movie-this": // searches OMDB for movies 
        movieThis(searchTerm);
        break;

    case "do-what-it-says": // reads requests and executes 
        doThis();
        break;
}


// concertThis function to call on bandintown 
function concertThis(artist) {
    // queryURL to pull and match response.data
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // Axios call
    axios.get(queryUrl).then(
        function (response) {
            // Console.log if response.data is defined
            // Pull at index 0 and match each value
            if (response.data[0].venue != undefined) {
                console.log("Event Venue: " + response.data[0].venue.name);

                console.log("Event Location: " + response.data[0].venue.city);

                var eventDate = moment(response.data[0].datetime);
                console.log("Event Date: " + eventDate.format("dddd, MMMM, YYYY"));
            }
            // "No Results" if response.data is undefined
            else {
                console.log("No Results");
            }
            // Catch and log error before close
        }).catch(function (error) {
            console.log(error);
        });
}

// spotifyThis function to search spotify for song track
function spotifyThis(song) {
    spotify.search({ type: 'track', query: song })
        // If there are no response.tracks respond with spotifyError
        .then(function (response) {
            if (response.tracks.total === 0) {
                spotifyError();
            }
            // Console.log if response.tracks
            // Pull at index 0 and match with each value
            else {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].track);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
            // Catch and log error before close
        }).catch(function (error) {
            console.log(error);
            console.log("No results found. Showing results for 'The Sign' by Ace of Base");
        });
}
// movieThis function to run Axios call on OMDB API
function movieThis(movie) {
    // Run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(function (response) {
        if (response.data.Title != undefined)
        // Console.log and match values if response.data.Title is defined
        {
            console.log("Title: " + response.data.Title);

            console.log("Year: " + response.data.Year);

            console.log("Rating: " + response.data.Rating);

            console.log("Country: " + response.data.Country);

            console.log("Language: " + response.data.Language);

            console.log("Plot: " + response.data.Plot);

            console.log("Actors: " + response.data.Actors);

            console.log("RottenTomatoes: " + response.data.rottenTomatoes);

        }
        // Show results for Mr. Nobody if response.data.Title is not defined
        else {
            movieThis("Mr. Nobody");
        }
        // Catch and log error before close
    }).catch(function (error) {
        console.log(error);
        console.log("No Results")
    })
}

// doThis function to listen for commands
// Console.log if error
function doThis() {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
    });

}