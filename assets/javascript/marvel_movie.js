// Variables
var query = window.location.search.substring(6);
var type = query.substring(0,query.indexOf("&"));
var movieID = query.substring((query.lastIndexOf("=")+1));

var queryURL = "http://www.omdbapi.com/?i=" + movieID + "&y=&plot=full&r=json";

// Get Movie
$.ajax({url: queryURL, method: 'GET'}).done(response);

// Functions
// Handle displaying Movie Info
function response (res) {
	console.log(res);
	
	// Display poster for Comic
	$(".poster").attr("src", res.Poster);

	// Display description for Movie
	$(".desc").addClass("jumbotron");
	$(".desc").html("<h2>" + res.Title + "</h2>");
	$(".desc").append(res.Plot);

	// Get characters that are in the Comic
	// getCharacters(res.data.results[0].characters.items);

	// console.log("Character Link:"+res.data.results[0].characters.items[0].resourceURI);
}

function getCharacters (results) {
	console.log(results);
	var baseUrl;

	for (var i = 0 ; i< results.length ; i++){
		
		baseUrl =  results[i].resourceURI + api;

		$.ajax({ url:baseUrl, method:"GET" }).done(showCharacters);
	}
}

function showCharacters (res) {
	// Create a character div
	var div = $("<div>");
	div.addClass("div-char");

	// Create an image div
	var img = $("<img>");
	img.addClass("char");
	img.attr("src", res.data.results[0].thumbnail.path+"/detail.jpg");

	// Append the image div to the character div
	div.append(img)

	// Append character name to character div
	div.append("<br>"+ res.data.results[0].name);

	// Display character div
	$(".characters").append(div);
}