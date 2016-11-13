// Variables
var query = window.location.search.substring(6);
var type = query.substring(0,query.indexOf("&"));
var id = query.substring((query.lastIndexOf("=")+1));

var comicID = id;
var api = "?ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
var con_comics = { url: "https://gateway.marvel.com/v1/public/comics/" + comicID + api, method: "GET" };

// Get Comic
$.ajax(con_comics).done(response);

// Functions
// Handle displaying Comic Info
function response (res) {
	console.log(res);
	var img = res.data.results[0].thumbnail.path.replace("http", "https") + "/portrait_incredible.jpg";
var title = res.data.results[0].title;
	// Display poster for Comic
	$(".poster").attr("src", img);

	// Display description for Comic
	$(".desc").addClass("jumbotron");
	$(".desc").html("<h2>" + title + "</h2>");
	$(".desc").append(res.data.results[0].description);

	// Create div for Comic Price button
	var priceDiv = $("<div>");
	priceDiv.addClass("btn btn-primary price");
	priceDiv.append( res.data.results[0].prices[0].price.toString() );

	// Display Comic Price button
	$(".desc").append("<br>");
	$(".desc").append(priceDiv);

	// Create div for Marvel link to buy Comic
	if (res.data.results[0].urls[1]) {
		var divPurchase = $("<a>");
		divPurchase.attr("href",res.data.results[0].urls[1].url.replace("http", "https") );
		divPurchase.text("purchase");
		
		//$(".purchase").append(divPurchase);
		$(".desc").append(divPurchase);

		console.log("ok"+amazon + title.replace(" ","+") + "comics");
	}
	else if (res.data.results[0].urls[0]) {
		var divPurchase = $("<a>");
		divPurchase.addClass(" purchase btn btn-primary")
		divPurchase.attr("href",res.data.results[0].urls[0].url.replace("http", "https") );
		divPurchase.text("Marvel");

		var amazonPurchase = $("<a>");
		amazonPurchase.addClass("purchase btn btn-primary");
		var amazon =  "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=";
		
		amazon = amazon + title;
		 amazon = amazon.replace(/ /g, "+");
		//amazon = " ";
		amazonPurchase.attr("href", amazon + "comics" );
		console.log("ok"+amazon + "comics");
		amazonPurchase.text("Amazon");


		$(".desc").append("<h3>Buy</h3> ");
	$(".desc").append(divPurchase);
	$(".desc").append(amazonPurchase);

		}


	// Get characters that are in the Comic
	getCharacters(res.data.results[0].characters.items);

	console.log("Character Link:"+res.data.results[0].characters.items[0].resourceURI.replace("http", "https"));
}

function getCharacters (results) {
	console.log(results);
	var baseUrl;

	for (var i = 0 ; i< results.length ; i++){
		
		baseUrl =  results[i].resourceURI.replace("http", "https") + api;

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
	img.attr("src", res.data.results[0].thumbnail.path.replace("http", "https") + "/detail.jpg");

	// Append the image div to the character div
	div.append(img)

	// Append character name to character div
	div.append("<br>"+ res.data.results[0].name);

	// Display character div
	$(".characters").append(div);
}