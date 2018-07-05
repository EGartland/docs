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

// initialize variables
var database = firebase.database();
// var contactsRef = database.ref('Contacts');
// var venueRef = database.ref('Event Info');

function clearForm() {
    $("#first_name").val("");
    $("#last_name").val("");
    $("#user_location").val("");
    $("#email").val("");
}


$("#submit-user").on("click", function (event) {
    event.preventDefault();

    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var userLocation = $("#user_location").val().trim();
    var email = $("#email").val().trim();

    database.ref().push({
        first: firstName,
        last: lastName,
        location: userLocation,
        email: email
    });

    clearForm();

});

function clearForm2() {
    $("#venue_name").val("");
    $("#venue_location").val("");
    $("#date_time").val("");
    $("#comments").val("");
}


$("#submit-user2").on("click", function (event) {
    event.preventDefault();

    var dropdown = $("#dropdown").val();
    var venue = $("#venue_name").val();
    var vLocation = $("#venue_location").val();
    var date = $("#date_time").val();
    var comments = $("#comments").val();

    database.ref().push({
        category: dropdown,
        venue: venue,
        vLocation: vLocation,
        date: date,
        comments: comments
    });

    clearForm2();

});

database.ref().on("child_added", function (snapshot) {
    // if (category == 1)
    
    $("#attractInfo").append(`
            <tr>
                <td>${snapshot.val().first}</td>
                <td>${snapshot.val().venue}</td>
                <td>${snapshot.val().vLocation}</td>
                <td>${snapshot.val().date}</td>
                <td>${snapshot.val().comments}</td>
            </tr>
    `);
    
});

database.ref().on("child_added", function (snapshot) {
    // if (category == 2)
    $("#artInfo").append(`
            <tr>
                <td>${snapshot.val().first}</td>
                <td>${snapshot.val().venue}</td>
                <td>${snapshot.val().vLocation}</td>
                <td>${snapshot.val().date}</td>
                <td>${snapshot.val().comments}</td>
            </tr>
    `);
});

database.ref().on("child_added", function (snapshot) {
    // if (category == 3)
    $("#entInfo").append(`
            <tr>
                <td>${snapshot.val().first}</td>
                <td>${snapshot.val().venue}</td>
                <td>${snapshot.val().vLocation}</td>
                <td>${snapshot.val().date}</td>
                <td>${snapshot.val().comments}</td>
            </tr>
    `);
});

database.ref().on("child_added", function (snapshot) {
    // if (category == 4)
    $("#sportsInfo").append(`
            <tr>
                <td>${snapshot.val().first}</td>
                <td>${snapshot.val().venue}</td>
                <td>${snapshot.val().vLocation}</td>
                <td>${snapshot.val().date}</td>
                <td>${snapshot.val().comments}</td>
            </tr>
    `);
});
