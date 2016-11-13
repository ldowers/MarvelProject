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
var movieArray = [];
var characterName = "";

// Initial array of favorite characters
var favorites = ['Hulk', 'Thor'];
var character = {
	id: 0,
	name : "",
	image : null
}

// ========================================================

// Generic function for displaying favorite character buttons
function renderButtons() { 
	// Deletes the buttons and gifs prior to adding new buttons and gifs (this is necessary otherwise you will have repeat buttons)
	$("#comicgifsAppearHere").empty();
	$("#buttonView").empty();

	// Loops through the array of favorite characters
	for (var i = 0; i < favorites.length; i++) {

		var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + favorites[i] + "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

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
	var newFavorite = $('#movie-input').val();

	newFavorite.replace(" ", "_");

	// The favorite character from the textbox is then added to our array
	if(newFavorite !== "") {
		favorites.push(newFavorite);

		// Our array then runs which handles the processing of our favorites array
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
	var queryURL = "http://gateway.marvel.com/v1/public/characters/" + id + "/comics?limit=40&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	.done(function(response) {
		var results = response.data.results;
		var active = 1;

		for (var i = 0; i < results.length; i++) {

			var gifDiv = $('<div class="item">')
			var id = results[i].id;
			var title = results[i].title;
			var image = results[i].thumbnail.path + "." +results[i].thumbnail.extension;

			// var p = $('<p>').text(title);

			// var personImage = $('<img>');
			// personImage.attr('src', image);
			// personImage.attr("data-id", id);
			// personImage.addClass("comic");


			// gifDiv.append(p);
			// gifDiv.append(personImage);

			// $('#comicgifsAppearHere').prepend(gifDiv);

			var item = $("<div>");
			
			if (active) {
				item.addClass("item active");
				active = 0;
			}
			else {
				item.addClass("item");
			}

			var img = $("<img>");
			img.attr("data-id", id);
			img.addClass("comic");
			img.attr('src', image);
			img.attr("width","460");
			img.attr("height","345");
			item.append(img);		

			var divCaption = $("<div>");
			divCaption.addClass("carousel-caption");
			divCaption.append("<h3>" + title + "</h3>");

			item.append(divCaption);

			$(".carousel-inner").append(item);
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
	var url = "marvel.html?type=comic&id="+id;

	window.location.href = url;
});

$("body").on("click", '.movie', function() {
	var id = $(this).attr("data-id");
	var url = "marvel.html?type=movie&id="+id;

	console.log("ID: " + id);
	console.log("URL: " + url);

	window.location.href = url;
});

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();