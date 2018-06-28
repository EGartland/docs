$(document).ready(function () {
    jQuery.ajaxPrefilter(function (options) {

        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


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
                // console.log('url', queryURL);
                // console.log(response)
                var results = JSON.parse(response).events;
                // console.log('results', results)
                updatePage(results);
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


            var startTime = eventResponse.start_time;

            console.log(startTime);

            $eventListItem.append("<p>Time: " + startTime + "</p>");

            console.log("---------------------------------------------")

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
    });
});