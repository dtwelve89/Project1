/////// HERE IS WHERE APIS WILL BE CALLED IMMEDIATELY UPON CITY INPUT SUBMIT

// Submit Click Function To Insert City into API search (Automatic Render)
$("#add-city").on("click", function(event) {
    event.preventDefault();

    // Clears Previous Search
    $("#auto-view").empty();
    
    //////////////////// Add API functions here (APIS WE WANT TO RUN INSTANTLY)
    console.log("HELLO, THIS IS A TEST");

    // Weather API function
    function weather() {


        let APIKey = "6bf5141aa280ab7faa386b3fe5d1454f";
        let cityWeather = this.value;

        let queryURL = "https:// api.openweathermap.org/data/2.5/find?q=" + cityWeather + "&units=imperial" + APIKey;

        // Ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            let weatherResults = response;
        })
    }
    /////////////////////////////////////////

    //API Initializers (Call API functions below so that they will run on submit)
    renderButtons();
    eventBriteInfo();
    $("#events-view").hide();
});

/////// BELOW ARE APIS TO BE CALLED ONLY ON BUTTON CLICK

// EventBrite API
function eventBriteInfo() {

    // Use location var with $("#city-input") submission
    var location = $("#city-input").val().trim();
    var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=SZDJEP44NSPTC2RGIFBQ&location.address=" + location;

    // AJAX Call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        var results = response;
        console.log(results);
        console.log(results.events);
        console.log(results.events[0]);
        console.log(results.events[0].logo.url);

        var header = $("<h1>")
            header.text("Local Events");
            
        for (var j = 0; j < 3; j++) {
            var eventDiv = $("<div>");
    
            var imgURL = results.events[j].logo.url;
            var description = results.events[j].description.text

            var image = $("<img>");
            image.attr("src", imgURL);

            var details = $("<p>");
            details.text(description)
    
            eventDiv.append(header);
            eventDiv.append(image);
            eventDiv.append(details);
            $("#events-view").prepend(eventDiv);
        }
    });
}

// Function to Render Button Features after City Input is Submitted
function renderButtons() {
  
    $("#buttons-view").empty();
  
    var eventButton = $("<button>");
    eventButton.addClass("btn btn-info border");
    eventButton.attr("id", "eventBrite");
    eventButton.text("Events");
    $("#buttons-view").append(eventButton);
}

// EventBrite On Click Function
$(document).on("click", "#eventBrite", function(event) {
    $("#events-view").show();
});