// Initialize Firebase
var config = {
	apiKey: "AIzaSyDvsjGzJ66U8aIrW1K15vXsLIKh4IS8AS8",
	authDomain: "marvel-favorites.firebaseapp.com",
	databaseURL: "https://marvel-favorites.firebaseio.com",
	storageBucket: "marvel-favorites.appspot.com",
	messagingSenderId: "408212986746"
};
firebase.initializeApp(config);

// Global Variables
var database = firebase.database();
var moviesRef = database.ref("/movies");
var movieObject = "";
var characterArray = [];
var imdbLink = "";
var marvelLink = "";

// Variables
var query = window.location.search.substring(6);
var type = query.substring(0,query.indexOf("&"));
var movieID = query.substring((query.lastIndexOf("=")+1));
var api = "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

var queryURL = "https://www.omdbapi.com/?i=" + movieID + "&y=&plot=short&r=json";

// Functions
// Handle displaying Movie Info
function response (res) {
	console.log(res);
	
	// Display poster for Movie
	$(".poster").attr("src", res.Poster);

	// Display description for Movie
	$(".desc").addClass("jumbotron");
	$(".desc").html("<h2>" + res.Title + "</h2>");
	$(".desc").append("<strong>Rating: </strong>" + res.Rated + "<br>");
	$(".desc").append("<strong>Release Date: </strong>" + res.Released + "<br>");
	$(".desc").append("<strong>Starring: </strong>" + res.Actors + "<br><br>");
	$(".desc").append(res.Plot);

	// Get characters and links for Movie
	characterArray = getCharacters(res.Title);

	// Display IMDb and Marvel buttons
	var imdbLinksDiv = $("<a>");
	imdbLinksDiv.addClass("btn btn-primary movieLinks");
	imdbLinksDiv.attr("href", imdbLink);
	imdbLinksDiv.text("IMDb");

	$(".desc").append("<br>");
	$(".desc").append(imdbLinksDiv);

	var marvelLinksDiv = $("<a>");
	marvelLinksDiv.addClass("btn btn-primary movieLinks");
	marvelLinksDiv.attr("href", marvelLink);
	marvelLinksDiv.text("Marvel");

	$(".desc").append(marvelLinksDiv);

	for (var i = 0; i < characterArray.length; i++) {
		var baseUrl = "https://gateway.marvel.com/v1/public/characters?name=" + characterArray[i] + api;	
		$.ajax({ url:baseUrl, method:"GET" }).done(showCharacters);
	}
}


function getCharacters(name) {
	if (movieObject != "") {
		var result = [];

		for (var i = 0; i < movieObject.val().length; i++) {

			if (movieObject.child(i).val().title == name) {
				result = movieObject.child(i).val().characters;
				imdbLink = movieObject.child(i).val().imdbURL;
				marvelLink = movieObject.child(i).val().marvelURL;

				return result;
			}
		};

		return result;
	}
};

function showCharacters (res) {
	var thumbnailPath = res.data.results[0].thumbnail.path.replace("http", "https");
	var comicID = thumbnailPath.substring((thumbnailPath.lastIndexOf("/")+1));

	if (comicID != "image_not_available") {
		console.log(thumbnailPath);

		// Create a character div
		var div = $("<div>");
		div.addClass("div-char");

		// Create an image div
		var img = $("<img>");
		img.addClass("char");
		img.attr("src", thumbnailPath +"/detail.jpg");

		// Append the image div to the character div
		div.append(img)

		// Append character name to character div
		div.append("<br>"+ res.data.results[0].name);

		// Display character div
		$(".characters").append(div);
	}
};

// Database Reference Handlers
moviesRef.on("value", function(snapshot) {
	if (snapshot.exists()) {
		movieObject = snapshot;

		// Get Movie
		$.ajax({url: queryURL, method: 'GET'}).done(response);
	}
});