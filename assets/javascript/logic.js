$(document).ready(function () {
    $(".dropdown-trigger").dropdown();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $(document).ready(function () {
        $('.parallax').parallax();
    });

    $(document).ready(function () {
        $('select').formSelect();
    });

    $(document).ready(function () {
        $('.datepicker').datepicker();
    });

    jQuery.ajaxPrefilter(function (options) {

        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCr_hLnXU7Cnf5tu-ujEIL4XMynoRAq_bQ",
        authDomain: "fewdaysoff-36949.firebaseapp.com",
        databaseURL: "https://fewdaysoff-36949.firebaseio.com",
        projectId: "fewdaysoff-36949",
        storageBucket: "fewdaysoff-36949.appspot.com",
        messagingSenderId: "140262551840"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    function makeQuery(location, category, keyWord) {

        var location = location;
        var category = category;
        var keyWord = keyWord;
        var queryURL = "https://api.eventful.com/json/events/search?q=" + keyWord + "&l=" + location + "&keywords=" + "&app_key=VNqTbXtWwtCF2b6f" + "&c=" + category + "&within=25" + "&units=miles" + "&t=This+Week" + "&page_size=10" + "&page_number=1"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log('url', queryURL);
                console.log(response)
                var results = JSON.parse(response).events;
                console.log('results', results)

                if (results == null) {
                    $("#event-list").append("<h1>No results found, sorry!</h1>")
                }
                else {
                    updatePage(results);
                }
            });

    };



    function updatePage(results) {


        for (var i = 0; i < 10; i++) {
            var eventResponse = results.event[i];

            eventCount = i + 1;

            var $eventList = $("<ul>");
            $eventList.addClass("list-group");

            $("#event-list").append($eventList);

            var title = eventResponse.title;
            var $eventListItem = $("<li class='list-group-item eventTitle'>");

            console.log('title', title);
            $eventListItem.append("<h3>" + title + "</h3>")

            var venueName = eventResponse.venue_name;

            console.log(venueName);

            $eventListItem.append("<p>Venue: " + venueName + "</p>");


            var startTime = moment(eventResponse.start_time).format('MMMM Do YYYY, h:mm:ss a');

            console.log(startTime);

            $eventListItem.append("<p>Time: " + startTime + "</p>");

            console.log("---------------------------------------------")

            $eventListItem.append('<button class="btn waves-effect waves-light mapButton" type="submit" id="mapButton' + i + '" name="action">Map It!</button>')

            $eventList.append($eventListItem);
        }
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        $("#event-list").empty();
        // In this case, the "this" keyword refers to the button that was clicked
        var location = $("#location").val().trim()
        var category = $("#category").val().trim()
        var keyWord = $("#key-words").val().trim()

        // Constructing a URL to search Giphy for the name of the person who said the quote
        makeQuery(location, category, keyWord)
        $("#event-list").removeClass("scale-out")
    });


    $("#submit-user").on("click", function (event) {
        event.preventDefault();
        // In this case, the "this" keyword refers to the button that was clicked
        var firstName = $("#first_name").val().trim();
        var lastName = $("#last_name").val().trim();

        var userLocation = $("#user_location").val().trim();

        var location = $("#location1").val().trim();

        var email = $("#email").val().trim();
        var userInput = $("#user-input");
        console.log(userInput)
        userInput.hide();
        userInput2.show()
    });


    $("#attractions-button").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        attractionsDisplay.show();
    });

    $("#arts-button").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        artsDisplay.show();
    });

    $("#entertainment-button").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        entertainmentDisplay.show();
    });

    $("#sports-button").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        sportsDisplay.show();
    });

    function resetEvents() {
        attractionsDisplay.hide();
        artsDisplay.hide();
        entertainmentDisplay.hide();
        sportsDisplay.hide();
    }


    //These on click events are for the drop down menue but do the same thing as the above commands.
    $("#attractions-drop").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        resetEvents();
        attractionsDisplay.show();
    });

    $("#arts-drop").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        resetEvents();
        artsDisplay.show();
    });

    $("#entertainment-drop").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        resetEvents();
        entertainmentDisplay.show();
    });

    $("#sports-drop").on("click", function (event) {
        event.preventDefault();
        var eventsSlide = $("#events-slide");
        eventsSlide.hide();
        resetEvents();
        sportsDisplay.show();
    });

    $("#help-tourist-button").on("click", function (event) {
        event.preventDefault();
        userInput.show();
        eventDisplay.hide();
        $(this).hide();
    })


    var attractionsDisplay = $("#attractions-display");
    var artsDisplay = $("#arts-display");
    var entertainmentDisplay = $("#entertainment-display");
    var sportsDisplay = $("#sports-display");
    var userInput2 = $("#user-input2");
    var userInput = $("#user-input");


    var eventDisplay = $("#event-display");
    eventDisplay.show();
    userInput2.hide();
    userInput.hide();

    resetEvents();



});