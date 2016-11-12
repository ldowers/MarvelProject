// Initial array of movies
var movies = ['Hulk', 'Thor'];
var character = {
	id:0,
	name : "",
	image : null
}

	// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 
		$("#comicgifsAppearHere").empty();

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$("#buttonView").empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++) {

	 		var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + movies[i] + "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
	 		$.ajax({
	 			url: queryURL,
	 			method: 'GET'
	 		})
	 		.done(function(response) {
	 			var results = response.data.results;

	 				var i =0;

	 				character.id = results[i].id;

	 				character.name = results[i].name;
	 				character.image = results[i].thumbnail.path + "/portrait_xlarge." +results[i].thumbnail.extension;
	 				var gifDiv = $('<div class="item">')

	 				var p = $('<p>').text(character.name);
	 				var personImage = $('<img>');
	 				personImage.attr('src', character.image);

	 				gifDiv.append(p);
	 				gifDiv.addClass("character");
	 				gifDiv.attr("data-name", character.name);
	 				gifDiv.attr("data-id", character.id);
	 				gifDiv.append(personImage);

	 				$('#buttonView').prepend(gifDiv);
	 		});

	 	}

	 }



	// ========================================================

	// This function handles events where one button is clicked
	$("body").on("click", '#addMovie', function() {

		// This line of code will grab the input from the textbox
		var movie = $('#movie-input').val();

		movie.replace(" ", "_");

		// The movie from the textbox is then added to our array
		if(movie !== "") {
			movies.push(movie);
			// Our array then runs which handles the processing of our movie array
			renderButtons();
		}
		
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	$("body").on("click", '.character', function() {
		$("#comicgifsAppearHere").empty();
		$("#comicgifsAppearHere").append("<br>");

		var name = $(this).data('name');
		var id = $(this).data('id');
	 		//var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + name + "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
	 		var queryURL = "http://gateway.marvel.com/v1/public/characters/" + id + "/comics?limit=40&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
	 		$.ajax({
	 			url: queryURL,
	 			method: 'GET'
	 		})
	 		.done(function(response) {
	 			var results = response.data.results;


	 			for (var i = 0; i < results.length; i++) {

	 				var gifDiv = $('<div class="item">')
	 				var id = results[i].id;
	 				var title = results[i].title;
	 				var image = results[i].thumbnail.path + "." +results[i].thumbnail.extension;

	 				var p = $('<p>').text(title);

	 				var personImage = $('<img>');
	 				personImage.attr('src', image);
	 				personImage.attr("data-id", id);
	 				personImage.addClass("comic");


	 				gifDiv.append(p);
	 				gifDiv.append(personImage);

	 				$('#comicgifsAppearHere').prepend(gifDiv);


	 			}
	 		});

	 		//////////////////


	 		$('#moviegifsAppearHere').empty();


	 		var queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&r=json";

	 		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

	 			var gifDiv = $('<div class="item">')
	 				var title = response.Title;
	 				var image = response.Poster;

	 				var p = $('<p>').text(title);

	 				var personImage = $('<img>');
	 				personImage.attr('src', image);
	 				personImage.attr("data-id", response.imdbID);
	 				personImage.addClass("movie");


	 				gifDiv.append(p);
	 				gifDiv.append(personImage);

	 				$('#moviegifsAppearHere').prepend(gifDiv);

	 		});




	 		/////////////////////
	 	});
	$("body").on("click", '.comic', function() {
		var id = $(this).attr("data-id");
		// console.log(state);
		// if(state == 'still') {

		// 	$(this).attr('src', $(this).data('animate'));
		// 	$(this).attr('data-state', 'animate');
		// }else {
		// 	$(this).attr('src', $(this).data('still'))
		// 	$(this).attr('data-state', 'still')
		// }
	});

	$("body").on("click", '.movie', function() {
		var id = $(this).attr("data-id");
		// console.log(state);
		// if(state == 'still') {

		// 	$(this).attr('src', $(this).data('animate'));
		// 	$(this).attr('data-state', 'animate');
		// }else {
		// 	$(this).attr('src', $(this).data('still'))
		// 	$(this).attr('data-state', 'still')
		// }
	});

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();