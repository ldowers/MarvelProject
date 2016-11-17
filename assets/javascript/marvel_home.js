// ========================================================

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDvsjGzJ66U8aIrW1K15vXsLIKh4IS8AS8",
	authDomain: "marvel-favorites.firebaseapp.com",
	databaseURL: "https://marvel-favorites.firebaseio.com",
	storageBucket: "marvel-favorites.appspot.com",
	messagingSenderId: "408212986746"
};
firebase.initializeApp(config);

// ========================================================

// Global Variables
var database = firebase.database();

var moviesRef = database.ref("/movies");
var movieObject = "";
var movieArray = [];

var favoritesRef = database.ref("/favorites");
var favoritesObject = "";
var favorites = [];

var character = {
	id: 0,
	name : "",
	image : null
}

// ========================================================

// Database Reference Handlers
$(document).ready(function() {
	moviesRef.on("value", function(snapshot) {
		if (snapshot.exists()) {
			movieObject = snapshot;
		}
	});

	favoritesRef.on("value", function(snapshot) {
		if (snapshot.exists()) {
			favoritesObject = snapshot;

			renderButtons();
		}
	});
});

// ========================================================

// Functions

// Generic function for displaying favorite character buttons
function renderButtons() {
	var currentUser = firebase.auth().currentUser;

	// Deletes the buttons  prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
	$("#buttonView").empty();

	if (currentUser != null) {

		// Get user's favorites from database
		favorites = getFavorites();	
	}

	console.log("Render Buttons: " + favorites);

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
			character.name = results[i].name.substring(0, 15);
			character.image = results[i].thumbnail.path.replace("http", "https") + "/portrait_xlarge." +results[i].thumbnail.extension;

			var gifDiv = $('<div class="item">');
			var p = ('<p>' + character.name + '<span class="delete" id="'+ character.name +'">X</span></p');
			var personImage = $('<img>');

			personImage.attr('src', character.image);
			personImage.addClass("characterImage");

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

function removeFavorite() {
	$(".carousel-inner").empty();
	$('#moviegifsAppearHere').empty();
	var index = favorites.indexOf($(this).attr("id"));

	favorites.splice(index, 1);
	storeFavorites();
};

function getFavorites() {
	var result = [];
	var currentUser = firebase.auth().currentUser;

	if (favoritesObject != "" && currentUser != null) {
		result = favoritesObject.child(currentUser.uid).val().characters;
	}
	
	return result;
};

function storeFavorites() {
	var currentUser = firebase.auth().currentUser;

	if (currentUser != null) {
		database.ref('favorites/' + currentUser.uid).set({
			displayName: currentUser.displayName,
			characters: favorites
		});
	}
	else {
		renderButtons();
	}
};

// ========================================================

// Event Handlers

$("#favorite-input").keyup(function(event) {

	var firstchar = event.key;
	if(firstchar.length === 1) {
		var queryURL = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + firstchar + "&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			var results = response.data.results;
			console.log(response);
			for (var i = 0; i < results.length; i++) {

				$("#autofill").append("<option value='" + results[i].name + "'>");
			}
		});
	}
});

// This function handles events where one button is clicked
$("body").on("click", '#addFavorite', function() {

	// This line of code will grab the input from the textbox
	var newFavorite = $('#favorite-input').val();
	
	// The favorite character from the textbox is then added to our array
	if(newFavorite !== "") {
		favorites.push(newFavorite);
		storeFavorites();
	}

	$('#favorite-input').val("");

	// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	return false;
});

$("body").on("click", '.character', function() {
	var name = $(this).data('name');
	var id = $(this).data('id');
	var queryURL = "https://gateway.marvel.com/v1/public/characters/" + id + "/comics?limit=90&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	.done(function(response) {

		var ul = $("<ul>");
		ul.addClass("nav nav-pills ");

		var li_1 = $("<li>");
		li_1.addClass("active");
		li_1.append('<a  href="#1b" data-toggle="tab">Movies</a>');

		var li_2 = $("<li>");
		li_2.append('<a href="#2b" data-toggle="tab">Comics</a>');

		ul.append(li_1);
		ul.append(li_2);

		$(".tabs").html(ul);

		var results = response.data.results;
		var active = 1;

		$(".carousel-inner").empty();

		for (var i = 0; i < results.length; i+=4) {

			var gifDiv = $('<div class="item">')
			var id = results[i].id;
			var title = results[i].title;
			var item = $("<div>");
			
			if (active) {
				item.addClass("item active");
				active = 0;
			}
			else {
				item.addClass("item");
			}
			for (var j = i ; j < i+4 ; j++){

				if ( results[j]) {
					var image = results[j].thumbnail.path.replace("http", "https") + "." +results[i].thumbnail.extension;

					var img = $("<img>");
					img.attr("data-id", id);
					img.addClass("comic");
					img.addClass("right");
					img.attr('src', image);
					img.attr("width","260");
					img.attr("height","145");
					item.append(img);	

					var divCaption = $("<div>");
					divCaption.addClass("carousel-caption");
					divCaption.append("<h3>" + title + "</h3>");

					item.append(divCaption);
				}
			}

			$(".carousel-inner").append(item);
		}
	});

	//////////////////////end get comics///////////////////

	
	$('#moviegifsAppearHere').empty();

	// Get array of movies for character that was clicked
	movieArray = getMovies(name);

	if (movieArray != []) {

		$('#moviegifsAppearHere').append("<h3>Movies</h3>");

		for (var i = 0; i < movieArray.length; i++) {
			var movie = movieArray[i];
			var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

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
	//////////////////////get movies///////////////////
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

$(document).on('click', '.delete', removeFavorite);

// ========================================================

// This calls the renderButtons() function
// renderButtons();


//================================================================================================= Mitchels Code For Login, Sign up, Sending Verifying Emails, Saving characters to User


//FIREBASE

//ALL VARIABLES
var auth = firebase.auth();
var user = firebase.auth().currentUser;
var marvelSearch = "";
var emailVerify = '';
var displayName = "";
var userRef = database.ref("/users");

// Create User on Firebase
function createUser() {
	console.log("working!");
	user = firebase.auth().currentUser;

	if (user != null) {

		user.providerData.forEach(function (profile) {

			displayName = $("#register-name").val();
			console.log("Sign-in provider: " + profile.providerId);
			console.log("  Provider-specific UID: " + profile.uid);
			console.log("  Name: " + profile.displayName);
			console.log("  Email: " + profile.email);
			console.log("  Photo URL: " + profile.photoURL);

			var userUID = firebase.auth().currentUser.uid;
			console.log(userUID);

			userArray = [{
				"displayName": displayName,
				"uid": userUID
			}];
			database.ref('/users').push(userArray);

		});

		$(".pop-back").remove();
		displayUser();
	}
	else {
		return false;
	}
};
// End Create User

// End profile check to change User to add UID
$('body').on('click', '#submit-reg', function(e){

	console.log($("#register-email").val());
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

       			setTimeout(function(){ firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       				console.log(firebase.auth().currentUser.emailVerified);

         			// Handle Errors here.
         			var errorCode = error.code;
         			var errorMessage = error.message;
         			console.log(error.code + ": " + error.message);
         		})}, 1000);

       			setTimeout(function(){	 emailVerify = firebase.auth().currentUser.emailVerified;

       				createUser();

       				firebase.auth().currentUser.sendEmailVerification().then(function() {
        			// Email sent.
        			console.log("Email Sent");
        		}, function(error) {
        			// An error happened.
        			console.log(error.code + ": " + error.message);
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
        			console.log(error.code + ": " + error.message);
        		})}, 2000)
       		});

//Submit
$('body').on('click', '#submit-log', function(){

	console.log($("#login-email").val());
	var email = $("#login-email").val();
	var password = $("#login-password").val();

	        //Sign in with Email and Password
	        auth.signInWithEmailAndPassword(email, password).catch(function(error) {

        		// Handle Errors here.
        		var errorCode = error.code;
        		var errorMessage = error.message;

        		if ( errorCode == "uth/wrong-password" || errorCode == "auth/user-not-found") {

        			$('#myModal').modal();
        			$(".modal-title").html("Try again");

        			$(".modal-body").html("Wrong email or password");

        		}
        		console.log(errorCode);
       		}); //End Sign in with Email

	        $(".pop-back").remove();
	        displayUser();

	       // emailVerify = firebase.auth().currentUser.emailVerified;
	   });

    // ============================
    //   Signout/ Login and Register Pop ups
    // ============================

    function displayUser() {

    	setTimeout (function() {
    		if (firebase.auth().currentUser != null ) {
    	//	alert(firebase.auth().currentUser.displayName);
    	$("#registerID").hide();
    	$("#loginID").hide();
    	$("#logoutID").show();
    	$("#nameID").html(firebase.auth().currentUser.displayName);
    	if (favoritesObject != "") {
    		renderButtons();
    	}
    }

    else{
    	//	alert("No user in firebase");
    	$("#registerID").show();
    	$("#loginID").show();
    	$("#logoutID").hide();
    	$("#nameID").html("");
    	$("#buttonView").empty();
    	$(".carousel-inner").empty();
    	$('#moviegifsAppearHere').empty();
    }
}, 2000);

    }


    $( document ).ready(function() {

    	displayUser();

    // ============================
    //   Signout Button
    // ============================

    $("#logoutID").on("click", function() {

       	//Firebase Sign out Function
       	firebase.auth().signOut().then(function() {

        // Sign-out successful.
        console.log("Signed out");
        favorites = [];
        displayUser();

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

    	$('.pop-form').html("<div class='jumbotron form-group'><span class='input-group-addon' id='basic-addon1'>Email</span><input type='email' class='form-control' aria-describedby='basic-addon1' id='login-email'><span class='input-group-addon' id='basic-addon2'>Password</span><input type='password' class='form-control' aria-describedby='basic-addon2' id='login-password'><button type='submit' id='submit-log'>Enter Lair</button></div>");

    	$('.pop-form').html("<div class='form-group'><span class='input-group-addon' id='basic-addon1'>Email</span><input type='email' class='form-control' aria-describedby='basic-addon1' id='login-email'><span class='input-group-addon' id='basic-addon2'>Password</span><input type='password' class='form-control' aria-describedby='basic-addon2' id='login-password'><button type='submit' id='submit-log'>Enter Lair</button></div>");

		//Click outside to make box disappear
		$('body').click(function(e){

			var Elem = e.target; 

			if ($(Elem).attr('class') == 'pop-back'){
				$('.pop-back').remove();
				return false;
			}
			else {
				return false;
			} 
		})

		 //End Click out to close login
		}); //End Login Pop up

	   	// ============================
       	//   Click function To pop up register
       	// ============================

       	$("[href='#Register-form']").on('click', function(){

       		$('body').prepend('<div class="pop-back"></div>');
       		$('.pop-back').html('<div class= "pop-form"></div>');
       		$('.pop-form').html('<div class="form-group"><span class="input-group-addon" id="basic-addon3">Display Name</span><input type="text" class="form-control" aria-describedby="basic-addon3" id="register-name"><span class="input-group-addon" id="basic-addon4">Email</span><input type="email" class="form-control" aria-describedby="basic-addon4" id="register-email"><span class="input-group-addon" id="basic-addon5">Password</span><input type="password" class="form-control" aria-describedby="basic-addon5" id="register-password"><button type="submit" id="submit-reg">Enter Lair</button></div>');

			//Click outside to make box disappear
			$('body').click(function(e){
				var Elem = e.target; 
				if ($(Elem).attr('class') == 'pop-back'){
					$('.pop-back').remove();
					return false;
				}
				else {
					return false;
				}
			});
		});
       });