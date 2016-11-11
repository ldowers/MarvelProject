// Initialize Firebase
var config = {
	apiKey: "AIzaSyDvsjGzJ66U8aIrW1K15vXsLIKh4IS8AS8",
	authDomain: "marvel-favorites.firebaseapp.com",
	databaseURL: "https://marvel-favorites.firebaseio.com",
	storageBucket: "marvel-favorites.appspot.com",
	messagingSenderId: "408212986746"
};
firebase.initializeApp(config);

// Variables
var database = firebase.database();

var moviesRef = database.ref("/movies");

// Store movies in Marvel Project database
function loadMarvelDB () {
	moviesRef.set([
	{
		title: "Iron Man",
		imdbURL: "http://www.imdb.com/title/tt0371746/?ref_=nv_sr_1",
		marvelURL: "http://marvel.com/movies/movie/19/iron_man",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "Iron Monger", "Obadiah Stane", "Pepper Potts", "Nick Fury"]
	}, {
		title: "The Incredible Hulk",
		imdbURL: "http://www.imdb.com/title/tt0800080/?ref_=nv_sr_2",
		marvelURL: "http://marvel.com/movies/movie/23/the_incredible_hulk",
		characters: ["Hulk", "Thunderbolt", "Emil Blonsky", "Betty Ross"]
	}, {
		title: "Iron Man 2",
		imdbID: "tt1228705",
		characters: ["Iron Man", "Black Widow"]
	}, {
		title: "Thor",
		imdbURL: "",
		marvelURL: "",
		characters: ["Thor", "Nick Fury"]
	}, {
		title: "Captain America",
		imdbURL: "",
		marvelURL: "",
		characters: ["Captain America"]
	}, {
		title: "The Avengers",
		imdbURL: "",
		marvelURL: "",
		characters: ["Iron Man", "Hulk", "Thor"]
	}, {
		title: "Iron Man 3",
		imdbURL: "",
		marvelURL: "",
		characters: ["Iron Man"]
	}, {
		title: "Thor: The Dark World",
		imdbURL: "",
		marvelURL: "",
		characters: ["Thor"]
	}, {
		title: "Captain America: The Winter Soldier",
		imdbURL: "",
		marvelURL: "",
		characters: ["Captain America"]
	}, {
		title: "Guardians of the Galaxy",
		imdbURL: "",
		marvelURL: "",
		characters: [""]
	}, {
		title: "Avengers: Age of Ultron",
		imdbURL: "",
		marvelURL: "",
		characters: ["Iron Man", "Hulk", "Thor"]
	}, {
		title: "Ant-Man",
		imdbURL: "",
		marvelURL: "",
		characters: ["Ant-Man"]
	}, {
		title: "Captain America: Civil War",
		imdbURL: "",
		marvelURL: "",
		characters: ["Captain America", "Iron Man"]
	}, {
		title: "Doctor Strange",
		imdbURL: "",
		marvelURL: "",
		characters: ["Doctor Strange"]
	}
	]);
};

// Call function to load database
loadMarvelDB();