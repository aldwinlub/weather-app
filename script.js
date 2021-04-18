var APIkey = "f0a9b92c7ca8de2586909358514d9db7"; // my unique API key

var getsCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");

var dateElement = document.getElementById("card-title");
var tempElement = document.getElementById("temp");
var humidElement = document.getElementById("humid");
var windElement = document.getElementById("wind");
var uviElement = document.getElementById("uvi");


getsCityForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var inputCityValue = inputCity.value; // the value of the city that was entered

    // this allows 
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + inputCityValue + "&limit=1&appid=" + APIkey).then(function(response) {
        return response.json()
        .then(function(data) {
            var lat = data[0].lat;  //initializing the lat and lon 
            var lon = data[0].lon;
            
            // this accesses the api and the response of the inputCityValue's lat and lon with the help pf the APIkey
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey).then(function(outcome) {
                return outcome.json()
                .then(function(weatherData) {
                    console.log(weatherData);

                    var weatherIcon = weatherData.daily[0].weather[0].icon;
                    
                    // appends all of the weather data to each specific description to their respected elements
                    tempElement.append(weatherData.daily[0].temp.day + "°F");
                    humidElement.append(weatherData.daily[0].humidity + "%");
                    windElement.append(weatherData.daily[0].wind_speed + "MPH");
                    uviElement.append(weatherData.daily[0].uvi);

                    // an if else is else statement that determines the color of the "UVI" depnding on its value
                    if(weatherData.daily[0].uvi < 3) {
                        uviElement.style.backgroundColor = "green"; 
                    }
                    else if (weatherData.daily[0].uvi < 7) {
                        uviElement.style.backgroundColor = "yellow";
                    }
                    else {
                        uviElement.style.backgroundColor = "red";
                    };

                    // tried to use moment.js 
                    var date = moment.unix(weatherData.current.data).format("MM/DD/YYYY");
                    dateElement.textContent = city + " " + date;
                    var iconImg = $("<img>");

                    iconImg.attr("src", "https://openweathermap.org/img/w" + weatherIcon + ".png");
                    iconImg.appendTo(dateElement);
                });
            });
        });
    });
});

