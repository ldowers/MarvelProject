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

	return false;
});