// Initialize Firebase
var config = {
	apiKey: "AIzaSyDvsjGzJ66U8aIrW1K15vXsLIKh4IS8AS8",
	authDomain: "marvel-favorites.firebaseapp.com",
	databaseURL: "https://marvel-favorites.firebaseio.com",
	storageBucket: "marvel-favorites.appspot.com",
	messagingSenderId: "408212986746"
};
firebase.initializeApp(config);

// Variables
var database = firebase.database();
var moviesRef = database.ref("/movies");
var movieObject = "";
var movieArray = [];
var characterName = "";

// Functions
function getMovies(name) {
	if (movieObject != "") {
		var result = [];

		for (var i = 0; i < movieObject.val().length; i++) {

			if (movieObject.child(i).val().characters.indexOf(name) >= 0) {
				result.push(movieObject.child(i).val().title);
			}
		};

		return result;
	}
};

function displayMovies() {
	if (movieArray != []) {

		$('#moviesView').empty();

		for (i=0; i<movieArray.length; i++) {
			var movie = movieArray[i];
			var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
			
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

				var tr;
				tr = $('<tr/>');
				tr.append("<td><img src=" + response.Poster + " width='200' height='297'></td>");
				tr.append("<td>" + response.Title + "</td>");
				tr.append("<td>" + response.Year + "</td>");
				tr.append("<td>" + response.Rated + "</td>");
				tr.append("<td>" + response.Runtime + "</td>");
				tr.append("<td>" + response.Genre + "</td>");
				tr.append("<td>" + response.Director + "</td>");
				tr.append("<td>" + response.Actors + "</td>");
				tr.append("<td>" + response.Plot + "</td>");
				$('#moviesView').append(tr);
			});

		}
	}
	else {
		$('#moviesView').html("No movies found");
	}
};

// Database Reference Handlers
moviesRef.on("value", function(snapshot) {
	if (snapshot.exists()) {
		movieObject = snapshot;
	}
});

// Event Handlers
$('#findMovie').on('click', function(){

	characterName = $('#movie-input').val();

	movieArray = getMovies(characterName);

	console.log(movieArray);

	displayMovies();

	return false;
});