	
 var query = window.location.search.substring(1);


 console.log("url " + query);

	var con_commics = { url: "https://gateway.marvel.com/v1/public/comics/38043?ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad",

			 method: "GET" };

			 var characters = { url: "https://gateway.marvel.com/v1/public/comics/22856?ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad",

			 method: "GET" };

			 var charactersName = [];
			 var count = 0;

$.ajax(con_commics).done(response);

function response (res) {
	console.log(res);
	var img = res.data.results[0].thumbnail.path + "/portrait_incredible.jpg";

$(".top").attr("src", img);




$(".desc").addClass("jumbotron");

$(".desc").html("<h2>" + res.data.results[0].title + "</h2>");

$(".desc").append(  res.data.results[0].description);


var priceDiv = $("<div>");
priceDiv.addClass(" btn btn-primary price");

priceDiv.append( res.data.results[0].prices[0].price.toString() );

$(".desc").append("<br>");
$(".desc").append( priceDiv );

var divPurchse = $("<a>");
divPurchse.attr("href",res.data.results[0].urls[1].url );
divPurchse.text("wa");
$(".purchase").append(divPurchse);

getCharacters(res.data.results[0].characters.items);



console.log("wa"+res.data.results[0].characters.items[0].resourceURI);

}








function getCharacters (results) {
	
	console.log(results);
var baseUrl ;
var api = "?ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

	for (var i = 0 ; i< results.length ; i++){
		
		baseUrl =  results[i].resourceURI + api;

		$.ajax({
			url:baseUrl,
			method:"GET"
		}).done(showCharacters);
	}

function showCharacters (res) {
	
	var div = $("<div>");
	div.addClass("div-char");
	var img = $("<img>");
	img.addClass("char");
	img.attr("src", res.data.results[0].thumbnail.path+"/detail.jpg");
	div.append(img)
	div.append("<br>"+ res.data.results[0].name);
	charactersName[count] = res.data.results[0].name;
	$(".characters").append(div);

count++;

if (charactersName.length == results.length) {

console.log(charactersName[1] );

}


}
}



	

	


