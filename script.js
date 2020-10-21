$("#search-btn").click(function () {
    city = $("#input").val();
    weatherCall(city);
});

var temperature;
var weatherIcon;
var latitude;
var longitude;
var iconURL;


function weatherCall(city) {
    var apikey = "&appid=e329da33b4b18efa883c3646124500ec";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apikey;
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log("response:", response);
        temperature = Math.round((response.main.temp - 273.15) * 1.8 + 32);
        weatherIcon = response.weather[0].icon;
        iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        apikey;
    });
}