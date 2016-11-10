// Firebase

// Load Firebase with data

// Variables
var characterArray = ["Iron Man", "Thor", "Captain America"];
var movieArray =
[{
	name: "Iron Man",
	movies: ["Iron Man", "Iron Man 2", "Iron Man 3", "The Avengers", "Avengers: Age of Ultron", "Captain America: Civil War"]
},
{
	name: "Thor",
	movies: ["Thor", "Thor: The Dark World", "The Avengers"]
},
{
	name: "Captain America",
	movies: ["Captain America", "The Avengers", "Captain America: The Winter Soldier", "Captain America: Civil War"]
}];

// Event Handlers
$('#findMovie').on('click', function(){

	var userInput = $('#movie-input').val();
	var index = -1;
	
	index = characterArray.indexOf(userInput);

	if (index >= 0) {

		$('#moviesView').empty();

		for (i=0; i<movieArray[index].movies.length; i++) {
			var movie = movieArray[index].movies[i];
			var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
			
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

				// Creates a generic div to hold the movie
				var movieDiv = $('<div class="movie">');

				// Displays the rrating
				movieDiv.append($('<p>').html("Rating: " + response.Rated));

				// Retrieves the release year
				var released = response.Released;

				// Creates an element to hold the release year
				var pTwo = $('<p>').text( "Released: " + released);

				// Displays the release year
				movieDiv.append(pTwo);

				// Retrieves the plot
				var plot = response.Plot;

				// Creates an element to hold the plot
				var pThree = $('<p>').text( "Plot: " + plot);

				// Appends the plot
				movieDiv.append(pThree);

				// Creates an element to hold the image 
				var image = $('<img>').attr("src", response.Poster);

				// Appends the image
				movieDiv.append(image);

				// Puts the entire Movie after the previous movies.
				$('#moviesView').append(movieDiv);
			});

		}
	}
	else {
		$('#moviesView').html("No movies found");
	}

	return false;
});