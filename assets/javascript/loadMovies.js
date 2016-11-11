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
		imdbURL: "http://www.imdb.com/title/tt0371746/",
		marvelURL: "http://marvel.com/movies/movie/19/iron_man",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "Pepper Potts", "Nick Fury", "Happy Hogan", "Iron Monger", "Obadiah Stane"]
	}, {
		title: "The Incredible Hulk",
		imdbURL: "http://www.imdb.com/title/tt0800080/",
		marvelURL: "http://marvel.com/movies/movie/23/the_incredible_hulk",
		characters: ["Hulk", "Bruce Banner", "Thunderbolt", "Emil Blonsky", "Betty Ross"]
	}, {
		title: "Iron Man 2",
		imdbURL: "http://www.imdb.com/title/tt1228705/",
		marvelURL: "http://marvel.com/movies/movie/130/iron_man_2",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "Pepper Potts", "Nick Fury", "Happy Hogan", "Black Widow", "Natasha Romanoff", "Justin Hammer", "Whiplash"]
	}, {
		title: "Thor",
		imdbURL: "http://www.imdb.com/title/tt0800369/",
		marvelURL: "http://marvel.com/movies/movie/36/thor",
		characters: ["Thor", "Loki", "Odin", "Jane Foster"]
	}, {
		title: "Captain America",
		imdbURL: "http://www.imdb.com/title/tt0458339/",
		marvelURL: "http://marvel.com/movies/movie/125/captain_america_the_first_avenger",
		characters: ["Captain America", "Steve Rogers", "Nick Fury", "Bucky Barnes", "Agent Carter", "Red Skull"]
	}, {
		title: "The Avengers",
		imdbURL: "http://www.imdb.com/title/tt0848228/",
		marvelURL: "http://marvel.com/movies/movie/152/marvels_the_avengers",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "Pepper Potts", "Nick Fury", "Hulk", "Bruce Banner", "Black Widow", "Natasha Romanoff", "Thor", "Loki", "Captain America", "Steve Rogers", "Hawkeye"]
	}, {
		title: "Iron Man 3",
		imdbURL: "http://www.imdb.com/title/tt1300854/",
		marvelURL: "http://marvel.com/movies/movie/176/iron_man_3",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "Iron Patriot", "Pepper Potts", "Happy Hogan", "The Mandarin"]
	}, {
		title: "Thor: The Dark World",
		imdbURL: "http://www.imdb.com/title/tt1981115/",
		marvelURL: "http://marvel.com/movies/movie/182/thor_the_dark_world",
		characters: ["Thor", "Loki", "Odin", "Jane Foster"]
	}, {
		title: "Captain America: The Winter Soldier",
		imdbURL: "http://www.imdb.com/title/tt1843866/",
		marvelURL: "http://marvel.com/movies/movie/181/captain_america_the_winter_soldier",
		characters: ["Captain America", "Steve Rogers", "Nick Fury", "Bucky Barnes", "Winter Soldier", "Black Widow", "Natasha Romanoff", "Sam Wilson", "Falcon", "Alexander Pierce"]
	}, {
		title: "Guardians of the Galaxy",
		imdbURL: "http://www.imdb.com/title/tt2015381/",
		marvelURL: "http://marvel.com/movies/movie/179/guardians_of_the_galaxy",
		characters: ["Star-Lord", "Peter Quill", "Gamora", "Drax", "Groot", "Rocket", "Ronan", "Yondu", "Nebula", "Korath"]
	}, {
		title: "Avengers: Age of Ultron",
		imdbURL: "http://www.imdb.com/title/tt2395427/",
		marvelURL: "http://marvel.com/movies/movie/193/avengers_age_of_ultron",
		characters: ["Iron Man", "Tony Stark", "Rhodey", "War Machine", "Nick Fury", "Hulk", "Bruce Banner", "Black Widow", "Natasha Romanoff", "Thor", "Captain America", "Steve Rogers", "Agent Carter", "Hawkeye", "Ultron", "Quicksilver", "Scarlet Witch", "Vision"]
	}, {
		title: "Ant-Man",
		imdbURL: "http://www.imdb.com/title/tt0478970/",
		marvelURL: "http://marvel.com/movies/movie/180/ant-man",
		characters: ["Ant-Man", "Scott Lang", "Hank Pym", "Hope van Dyne", "Yellowjacket", "Sam Wilson", "Falcon"]
	}, {
		title: "Captain America: Civil War",
		imdbURL: "http://www.imdb.com/title/tt3498820/",
		marvelURL: "http://marvel.com/movies/movie/219/captain_america_civil_war",
		characters: ["Captain America", "Steve Rogers", "Iron Man", "Tony Stark", "Black Widow", "Natasha Romanoff", "Bucky Barnes", "Winter Soldier", "Sam Wilson", "Falcon", "Rhodey", "War Machine", "Hawkeye", "Black Panther", "Vision", "Scarlet Witch", "Ant-Man", "Scott Lang", "Spider-Man", "Peter Parker"]
	}, {
		title: "Doctor Strange",
		imdbURL: "http://www.imdb.com/title/tt1211837/",
		marvelURL: "http://marvel.com/doctorstrangepremiere",
		characters: ["Doctor Strange"]
	}
	]);
};

// Call function to load database
loadMarvelDB();