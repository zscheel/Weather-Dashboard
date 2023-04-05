var apiKey = "70539c089a192ad51dae93112ad8a637";
var latLon = [1, 2];
var weatherDisplay = $("#weather-display");
var frm = $("#city-form");
var historyCards = $("#history");
var historyCardsTwo = document.querySelector("#history");
var cityHistory = [];

function createData(city) {
    weatherDisplay.empty();
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(apiUrlCurrent).then(function(response){
    if (response.ok){
        response.json().then(function(data){
            console.log(data);
            createCurrentWeather(data);
            futureWeather(data.coord.lat, data.coord.lon)
            })
        } else {
            alert("Please enter a real city");
        }  
    })
}

function futureWeather(lat, lon) {
    var apiUrlFuture = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely_hourly_alerts&units=imperial&appid=" + apiKey;
    fetch(apiUrlFuture).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                futureCards(data);
            })
        }
    })
}


function addToStorage(parent) {
    for (i = 0; i < cityHistory.length; i ++) {
        var city = parent;
        if(city === cityHistory[i]) {
            return false;
        }
        
    }
    var btn = $("<button class='btn btn-secondary m-2'>" + parent + "</button>");
    historyCards.append(btn);
    cityHistory.unshift(parent);
    localStorage.setItem("cityStorage", JSON.stringify(cityHistory));
}




frm.submit(function(e) {
    e.preventDefault();
    var cityName = document.querySelector("#city-search").value;
    createData(cityName);
    var frm = document.querySelector("#city-form")
    frm.reset();
});