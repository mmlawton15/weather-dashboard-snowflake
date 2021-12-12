// DONE - GIVEN a weather dashboard with form inputs
// DONE - WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var cityUserSearchesFor = document.querySelector("#city");
var currentCityContainer = document.querySelector("selectedCityCurrentWeather");
var myApiKey = "2e2ca0507dda47fa6f94fa93790f0ec0";
var currentDateAndTime = document.getElementById("cityAndDate").textContent += moment().format('dddd (MM/DD/YY) h:mm a');
var cityName;
var currentWeather;
var currentUVIndex;
var lat;
var lon;

//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    cityName = cityUserSearchesFor.value;
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})

//CODE FOR CITY BUTTONS ON THE LEFT
document.querySelector("#austin").addEventListener('click', function() {
    cityName = "Austin";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#chicago").addEventListener('click', function() {
    cityName = "Chicago";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#newYork").addEventListener('click', function() {
    cityName = "New York";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#orlando").addEventListener('click', function() {
    cityName = "Orlando";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#sanFrancisco").addEventListener('click', function() {
    cityName = "San Francisco";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#seattle").addEventListener('click', function() {
    cityName = "Seattle";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#denver").addEventListener('click', function() {
    cityName = "Denver";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})
document.querySelector("#atlanta").addEventListener('click', function() {
    cityName = "Atlanta";
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime); //display the icon from the current weather array ( + data.weather.icon)
    getSearchedCityWeather();
    getSearchedCityForecast();
})

//REFERENCE THE API WHEN THE BUTTON IS CLICKED BASED ON THE CITYNAME
var getSearchedCityWeather = function() {
    var currentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${myApiKey}`)
    .then(function(cityName) {
        if (cityName.status !==200) {
            console.log("there was a problem, status code:" + cityName.status);
            return;
        }
        cityName.json().then(function(data) {//Examine the text in the response
            console.log(data); //console log the array of weather data
            lat = data.coord.lat; //when the search button is clicked, grab the longitude from the data and set it to this variable
            lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
            document.querySelector("#temperature").textContent = ("Temperature: " + data.main.temp + "°F"); //get into the array, select the secion you want the data from and put it intp the text content
            document.querySelector("#wind").textContent = ("Wind Speed: " + data.wind.speed + " mph");
            document.querySelector("#humidity").textContent = ("Humidity: " + data.main.humidity + "%");
            getSearchedCityUVIndex(lat, lon);
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
    console.log(currentWeather);
}

//CODE FOR THE UV INDEX
var getSearchedCityUVIndex = function(lat, lon) {
    var currentUVIndex = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}`)
    .then(function(cityName) {
        console.log(cityName.body);
        if (cityName.status !==200) {
            console.log("there was a problem, status code: " + cityName.status);
            return;
        }
        cityName.json().then(function(data) {//Examine the text in the response
            document.querySelector("#uvIndexBox").textContent = (data.current.uvi)
            if (data.current.uvi > 7) {
                document.querySelector("#uvIndexBox").className = "uvIndexBoxHigh";
            } if (data.current.uvi > 3) {
                document.querySelector("#uvIndexBox").className = "uvIndexBoxMedium";
            } else {
                document.querySelector("#uvIndexBox").className = "uvIndexBox";
            }
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
}



//CODE FOR 5 DAY FORECAST
var getSearchedCityForecast = function() {
    var forecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${myApiKey}`)
    .then(function(cityName) {
        if (cityName.status !==200) {
            console.log("there was a problem, status code: " + cityName.status);
            return;
        }
            cityName.json().then(function(data) {
                for (var i=0; i+=8; i<=data.list.length){ //for variable i, increase by 8 (the 5 day forecast shows 3 hour increments for the data so by doing it every 8 i can skip days)
                    console.log(data.list[i]);//look at the data currently assigned to i
                    //var arrayOfMiniDivs = document.getElementsByClassName("miniDate", "miniTemp", "miniWind", "miniHumidity");
                    var banana = document.getElementsByClassName("miniDate")
                    console.log(banana);//ask BCS said this would help me see what I was trying to grab
                    document.querySelectorAll("#miniDate").textContent = moment().format("MM/DD/YYYY"); //set the text content for any element with a id of miniTemp to te date
                    document.querySelectorAll("#miniTemp").textContent = ("Temp: " + data.main.temp + "°F");
                    document.querySelectorAll("#miniWind").textContent = ("Wind: " + data.wind.speed + "mph");
                    document.querySelectorAll("#miniHumidity").textContent = ("Humidity: " + data.main.humidity + "%");
                };
            })  
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });
}



//FOR LOOP FOR LOOPING THROUGH 5 DAY FORECAST
//i+=8 lets us increment our iterating variable up by 8, rather than the common i++ incrementing by 1!
//You could even start off at i = 1-4 and it would probably do well


// again, you can either use what youre using now and change how you use it to fit the datatype you are currently getting (object, not array) 
// or you can use a different syntax (which u can google the docs for once you know what it is) that retrieves a datatype that your current code is fit to use (array) 
// and that you have already used in the code