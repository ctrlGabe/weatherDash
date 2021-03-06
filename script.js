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

        $("#cityName").text(response.name + " (" + (moment().format("l") + ")"))
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

    var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    apikey;

    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        console.log("forecast response", response);

        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("03:00:00") > 0) {
              temperature = Math.round((response.list[i].main.temp - 273.15) * 1.8 + 32);
              forecastIcon = response.list[i].weather[0].icon;
              forecastURL = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
              var date = moment(response.list[i].dt_txt).format("l");
              var weatherCards = `<div">
                  <div class="card-body">
                    <h4 class="forecast-date card-title">${date}</h4>
                    <span class="forecast-icon"><img src=${forecastURL}></span>
                    <p class="forecast-temp">Temp: ${temperature} °F</p>
                    <p class="forecast-humid">Humidity: ${response.list[i].main.humidity} %</p>
                  </div>
                </div>`;

              $("#forecast").append(weatherCards);
              console.log(weatherCards)
            }
          }
    });

}
