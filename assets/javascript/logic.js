$(document).ready(function () {
    var map;

    $(".dropdown-trigger").dropdown();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $(document).ready(function () {
        $('.parallax').parallax();
    });

    // $(document).ready(function () {
    //     $('select').formSelect();
    // });

    $(document).ready(function () {
        $('.datepicker').datepicker();
    });


    function makeQuery(location, category, keyWord) {

        jQuery.ajaxPrefilter(function (options) {

            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });

        var location = location;
        var category = category;
        var keyWord = keyWord;
        var queryURL = "https://api.eventful.com/json/events/search?q=" + keyWord + "&l=" + location + "&keywords=" + "&app_key=VNqTbXtWwtCF2b6f" + "&c=" + category + "&within=25" + "&units=miles" + "&t=This+Week" + "&page_size=10" + "&page_number=1"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = JSON.parse(response).events;

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
            latitude = eventResponse.latitude;
            longitude = eventResponse.longitude;

            eventCount = i + 1;

            var $eventList = $("<ul>");
            $eventList.addClass("list-group");

            $("#event-list").append($eventList);

            var title = eventResponse.title;
            var $eventListItem = $("<li class='list-group-item eventTitle'>");

            $eventListItem.append("<h3>" + title + "</h3>")

            var venueName = eventResponse.venue_name;

            $eventListItem.append("<p>Venue: " + venueName + "</p>");


            var startTime = moment(eventResponse.start_time).format('MMMM Do YYYY, h:mm:ss a');

            $eventListItem.append("<p>Time: " + startTime + "</p>");

            $eventListItem.append('<button class="btn waves-effect waves-light mapButton" type="submit" id="mapButton' + i + '" name="action" venue-lat=' + latitude + ' venue-lon=' + longitude + '>Map It!</button>')

            $eventList.append($eventListItem);
        }

    }

    $(document).on("click", ".mapButton", function (event) {
        event.preventDefault();
        localLat = parseFloat($(this).attr("venue-lat"))
        localLon = parseFloat($(this).attr("venue-lon"))
        center = new google.maps.LatLng(localLat, localLon)
        initMap();
    });

    $(document).on("click", "#back-to-list", function (event) {
        $("#map").hide();
        $("#back-to-list").hide();
        $("#main").show()
    });

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

        var email = $("#email").val().trim();
        var userInput = $("#user-input");
        userInput.hide();
        userInput2.show();

    });
    
    $("#submit-user2").on("click", function (event) {
        event.preventDefault();
        // In this case, the "this" keyword refers to the button that was clicked
        //var firstName = $("#first_name").val().trim();
        //var lastName = $("#last_name").val().trim();

        //var userLocation = $("#user_location").val().trim();

        //var email = $("#email").val().trim();
        //var userInput = $("#user-input");
        userInput.hide();
        userInput2.hide();

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

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(39.09973, -94.57857),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // assigning to global variable:
        map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        $("#map").hide();
        $("#back-to-list").hide();
        
    }

    var markers = [];

    function initMap() {

        var center = new google.maps.LatLng(localLat, localLon)
        
        map.panTo(center);
        
        var marker = new google.maps.Marker({
            position: center,
            map: map,
            title: 'Here You Go!'
        });

        markers.push(marker);

        $("#map").show();
        $("#back-to-list").show();
        $("#main").hide()
    }

    initialize();

});

