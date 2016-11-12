
//ALL VARIABLES
          var database = firebase.database();
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
//

console.log(database.ref('users/0/'));
database.ref('users/').set({displayName: {"favorites": [0]}});
database.ref('users/0/').set([1,2,3,4,5,6,7,]);
//CLICK FUNCTIONS START
$( document ).ready(function() {


      //SEARCH BAR
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
      });



      //Register Form
      $("#register-submit").on("click", function() {

       console.log($("#register-email").val());
       //Variables
       var email = $("#register-email").val();
       var password = $("#register-password").val();
       var displayName = $("#register-name").val();

       firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        })
       firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         console.log(firebase.auth().currentUser.emailVerified);

         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
       })
       emailVerify = firebase.auth().currentUser.emailVerified;

       firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email sent.
        console.log("Email Sent")
      }, function(error) {
        // An error happened.
      })

       firebase.auth().currentUser.updateProfile({
        displayName: displayName,
        photoURL: '1'
      }).then(function() {
        console.log("update");
        // Update successful.
      }, function(error) {
        console.log("error");
        // An error happened.
      })




    })



      console.log(firebase.auth().currentUser);


      //Login Form
      $("#login-submit").on("click", function() {
        console.log($("#login-email").val());
        var email = $("#login-email").val();
        var password = $("#login-password").val();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         console.log(firebase.auth().currentUser.emailVerified);

         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;

       })
        emailVerify = firebase.auth().currentUser.emailVerified;
      })

       //Signout Button
       $("#signout").on("click", function() {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Signed out");
      }, function(error) {
         // An error happened.
       })
      })

             var ref = new Firebase("file:///C:/Users/Mitchel/Desktop/UCF_Projects/MarvelProject/home.html");
      ref.onAuth(function(authData) {
        console.log("It worked!");
        if (authData) {
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
          console.log("User is logged out");
        }
      });
     });
















//  $("#googlesignin").on("click", function() {
// //Google Login
// console.log("GOOGLE");
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

// })
// })


//  $("#facebooksignin").on("click", function() {
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

// })
// })


// //Send Verification Email
//  firebase.auth().onAuthStateChanged(function(user) {
//   if(emailVerify == false) {
//    firebase.auth().currentUser.sendEmailVerification().then(function() {
//   // Email sent.
//   console.log("Email Sent")
// }, function(error) {
//   // An error happened.
// })}
//    else {
//     return false;
//   }
// })