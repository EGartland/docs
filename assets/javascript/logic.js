// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlQqYR8mkr7JCsFZFbdpZBAVmu3PAskKg",
    authDomain: "group-project-1-65238.firebaseapp.com",
    databaseURL: "https://group-project-1-65238.firebaseio.com",
    projectId: "group-project-1-65238",
    storageBucket: "group-project-1-65238.appspot.com",
    messagingSenderId: "182134415917"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

function makeQuery(location, category, keyWord) {
    var location = location;
    var category = category;
    var keyWord = keyWord;
    var queryURL = "https://api.eventful.com/json/events/search?q=" + keyWord + "&l=" + location + "&keywords=" + "&app_key=VNqTbXtWwtCF2b6f" + "&c=" + category + "&within=25" + "&units=miles" + "&t=This+Week" + "&page_size=10" + "&page_number=1"

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

        });
    console.log(queryURL);
};

$("#submit").on("click", function (event) {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    var location = $("#location").val().trim()
    var category = $("#category").val().trim()
    var keyWord = $("#key-words").val().trim()

    // Constructing a URL to search Giphy for the name of the person who said the quote
    makeQuery(location, category, keyWord)
});

$("#submit-user").on("click", function (event) {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var location = $("#location").val().trim();
    var email= $("#email").val().trim();
    var userInput= $("#user-input");
    console.log(userInput)
    userInput.hide();
    userInput2.show()
});


    var userInput2= $("#user-input2");
    userInput2.hide();