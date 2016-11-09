  var config = {
  	apiKey: "AIzaSyB_yYwEL9_In6KbQFf_3reG-K2nfvw_hnw",
  	authDomain: "marvel-project-18704.firebaseapp.com",
  	databaseURL: "https://marvel-project-18704.firebaseio.com",
  	storageBucket: "marvel-project-18704.appspot.com",
  	messagingSenderId: "500854224093"
  };
  firebase.initializeApp(config);

  var database = "firebase.database()";
  var marvelSearch = "https://gateway.marvel.com/v1/public/characters?name=iron%20man&ts=1478356491&apikey=6cc069598783b79627fb5a9f9e9ae0d1&hash=974b8d2e4b79defb4d3d7ecadf1ae1ad";

  $( document ).ready(function() {
  	$("#search-submit").on("click", function() {
  		var searchTerm = $("#search-input").val();
  		console.log($("#search-input").val());
	//$("#search-input").val('');
	var searched = $("#search-input").val();
	$.ajax({
		url: marvelSearch,
		method: 'GET'
	})
	.done(function(response){
		console.log(response);
	});
});

// var providerGoogle = new firebase.auth.GoogleAuthProvider();
// var providerFB = new firebase.auth.FacebookAuthProvider();

$("#register-submit").on("click", function() {
	console.log($("#register-email").val());
// 	firebase.auth().createUserWithEmailAndPassword($("#register-email").val(), $("#register-password").val()).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
// })
});


// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;

// });
//   });


// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }, function(error) {
//    // An error happened.
// });

// //Google Login
// firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;

// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;

// });

// //Facebook Login
// firebase.auth().signInWithPopup(providerFB).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;

// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;

// });