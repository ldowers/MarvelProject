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

// Initial array of favorite characters
var favorites = ['Hulk', 'Thor'];
var character = {
	id: 0,
	name : "",
	image : null
}

// ========================================================

// Database Reference Handlers
moviesRef.on("value", function(snapshot) {
	if (snapshot.exists()) {
		movieObject = snapshot;
	}
});

// ========================================================

// Functions

// Generic function for displaying favorite character buttons
function renderButtons() { 
	// Deletes the buttons  prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
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
};

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

// ========================================================

// This function handles events where one button is clicked
$("body").on("click", '#addFavorite', function() {

	// This line of code will grab the input from the textbox
	var newFavorite = $('#favorite-input').val();

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

	// Get array of movies for character that was clicked
	movieArray = getMovies(name);

	if (movieArray != []) {
		for (var i = 0; i < movieArray.length; i++) {
			var movie = movieArray[i];
			var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

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

				$('#moviegifsAppearHere').append(gifDiv);
			});
		}
	}
});


$("body").on("click", '.comic', function() {
	var id = $(this).attr("data-id");
	var url = "marvel_comic.html?type=comic&id="+id;

	window.location.href = url;
});

$("body").on("click", '.movie', function() {
	var id = $(this).attr("data-id");
	var url = "marvel_movie.html?type=movie&id="+id;

	window.location.href = url;
});

// ========================================================

// This calls the renderButtons() function
renderButtons();


//================================================================================================= Mitchels Code For Login, Sign up, Sending Verifying Emails, Saving characters to User


//FIREBASE



//ALL VARIABLES
// var database = firebase.database();
var auth = firebase.auth();
var user = firebase.auth().currentUser;
var marvelSearch = "";
var emailVerify = '';
var providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/plus.login');
providerGoogle.setCustomParameters({
	'login_hint': 'user@example.com'
});
var providerFB = new firebase.auth.FacebookAuthProvider();
var displayName = "";
var userObj = {};
//

console.log(database.ref('users/0/'));
database.ref('users/').set({displayName: {"favorites": [0]}});
database.ref('users/0/').set([1,2,3,4,5,6,7,]);

// Create User on Firebase
function createUser() {
	userObj[displayName] = {
		"favorites": [0],
		"uid": userUID
	};
	database.ref('users/').set(userObj);
}
// End Create User

// profile check to change User to add UID
if (user != null) {
	user.providerData.forEach(function (profile) {

		console.log("Sign-in provider: "+profile.providerId);
		console.log("  Provider-specific UID: "+profile.uid);
		console.log("  Name: "+profile.displayName);
		console.log("  Email: "+profile.email);
		console.log("  Photo URL: "+profile.photoURL);
		var userUID = profile.uid;

	})
}
// End profile check to change User to add UID

//CLICK FUNCTIONS START
$( document ).ready(function() {
	
	// SEARCH BAR
	$("#search-submit").on("click", function() {

		var searchTerm = $("#search-input").val();
		var marvelSearch = "https://gateway.marvel.com/v1/public/characters?name=" + searchTerm + "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
		console.log($("#search-input").val());
		$("#search-input").val('');
		var searched = $("#search-input").val();

		$.ajax({
			url: marvelSearch,
			method: 'GET'
		})
		.done(function(response){
			console.log(response);
		});
        // End Ajax
    });
    // End Done

    //   Login Form
    $("#login-submit").on("click", function() {

    	console.log($("#login-email").val());
    	var email = $("#login-email").val();
    	var password = $("#login-password").val();

        //Sign in with Email and Password
        user.signInWithEmailAndPassword(email, password).catch(function(error) {

        	// Handle Errors here.
        	var errorCode = error.code;
        	var errorMessage = error.message;

    	}); //End Sign in with Email

        emailVerify = firebase.auth().currentUser.emailVerified;

 	});//End Login Form



    // ============================
    //   Signout Button
    // ============================

    $("#signout").on("click", function() {

       	//Firebase Sign out Function
       	firebase.auth().signOut().then(function() {

        // Sign-out successful.
        console.log("Signed out");

    }, function(error) {

        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;

    });

   	});//End Signout



    // ============================
    //   Click function To pop up login
    // ============================

    $("[href='#Login-form']").on('click', function(){

    	$('body').prepend('<div class="pop-back"></div>');
    	$('.pop-back').html('<div class= "pop-form"></div>');
    	$('.pop-form').html("<form id='location-form'><label for='location-pick'><select class='form-control' id='location-pick'><option>Altamonte Springs</option><option>Apopka</option><option>Clermont</option><option>Davenport</option><option>Kisssimmee</option><option>Lake Mary</option><option>Longwood</option><option>Maitland</option><option>Orlando</option><option>Sanford</option><option>Wekiva Springs</option><option>Windermere</option><option>Winter Park</option></select><button type='submit' id='submit-log'>SELECT CITY</button></form>");

		//Click outside to make box disappear
		$('body').click(function(e){

			var Elem = e.target; 
			console.log($(Elem).attr('class'));
			console.log(e.data);

			if ($(Elem).attr('class') == 'pop-back'){
				$('.pop-back').remove();
				return false;
			}
			else {
				return false;
			}
		}); //End Login Pop up

		//Submit
		$('#submit-log').on('click', function(){

			console.log($("#login-email").val());
			var email = $("#login-email").val();
			var password = $("#login-password").val();

	        //Sign in with Email and Password
	        user.signInWithEmailAndPassword(email, password).catch(function(error) {

        		// Handle Errors here.
        		var errorCode = error.code;
        		var errorMessage = error.message;
       		}); //End Sign in with Email

	        emailVerify = firebase.auth().currentUser.emailVerified;
	    });

	   	// ============================
       	//   Click function To pop up register
       	// ============================

       	$("[href='#Register-form']").on('click', function(){

       		$('body').prepend('<div class="pop-back"></div>');
       		$('.pop-back').html('<div class= "pop-form"></div>');
       		$('.pop-form').html("<form id='location-form'><label for='location-pick'><select class='form-control' id='location-pick'><option>Altamonte Springs</option><option>Apopka</option><option>Clermont</option><option>Davenport</option><option>Kisssimmee</option><option>Lake Mary</option><option>Longwood</option><option>Maitland</option><option>Orlando</option><option>Sanford</option><option>Wekiva Springs</option><option>Windermere</option><option>Winter Park</option></select><button type='submit' id='submit-reg'>SELECT CITY</button></form>");

			//Click outside to make box disappear
			$('body').click(function(e){
				var Elem = e.target; 
				console.log($(Elem).attr('class'));
				console.log(e.data);
				if ($(Elem).attr('class') == 'pop-back'){
					$('.pop-back').remove();
					return false;
				}
				else {
					return false;
				}
			});

			$('#submit-reg').on('click', function(){

				console.log($("#register-email").val());

       			//Variables
       			var email = $("#register-email").val();
       			var password = $("#register-password").val();
       			var displayName = $("#register-name").val();

       			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

          			// Handle Errors here.
          			var errorCode = error.code;
          			var errorMessage = error.message;
          			console.log(error.code + ": " + error.message);
          		});

       			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       				console.log(firebase.auth().currentUser.emailVerified);

         			// Handle Errors here.
         			var errorCode = error.code;
         			var errorMessage = error.message;
         		});

       			emailVerify = firebase.auth().currentUser.emailVerified;

       			createUser();

       			firebase.auth().currentUser.sendEmailVerification().then(function() {
        			// Email sent.
        			console.log("Email Sent");
        		}, function(error) {
        			// An error happened.
        		});

       			firebase.auth().currentUser.updateProfile({
       				displayName: displayName,
       				photoURL: '1'
       			}).then(function() {
       				console.log("update");
        			// Update successful.
        		}, function(error) {
        			console.log("error");
        			// An error happened.
        		});
       		});
		});
       });
});