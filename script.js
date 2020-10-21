$("#search-btn").click(function () {
    city = $("#input").val();
    weatherCall(city);
});

var temperature;
var weatherIcon;
var latitude;
var longitude;
var iconURL;
var uvURL;


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

        $("#cityName").text(response.name)
        $("#cityName").append("<span><img src=" + iconURL + "></span>")
        $("#temp").text("Temperature: " + temperature + " °F");
        $("#wind").text("Wind: " + response.wind.speed + " MPH");
        $("#humid").text("Humidity: " + response.main.humidity + " %")

        $.ajax({
            url: uvURL,
            method: "GET",
        }).then(function (response) {
            uvValue = response.value;
            $("#uv").text("UV index: " + response.value);

            if (response.value < 3) {
                $("#uv").addClass("bg-success");
              } else if (response.value > 2 || response.value < 8) {
                $("#uv").addClass("bg-warning");
              } else {
                $("#uv").addClass("bg-danger");
              }
        });
    });

}
