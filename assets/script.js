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

//WHEN SEARCH BUTTON IS CLICKED, LOG THE VALUE
document.querySelector("#searchButton").addEventListener('click',function() {
    console.log(cityUserSearchesFor.value);
    cityName = cityUserSearchesFor.value;
    document.getElementById("cityAndDate").textContent = (cityName + " - " + currentDateAndTime);
    getSearchedCityWeather();
    console.log(currentWeather.main.temp);
    document.querySelector("#temperature").textContent = (currentWeather.main.temp); //get into the array, select the secion you want the data from and put it intp the text content
    document.querySelector("#wind").textContent = (currentWeather.wind.speed);
    document.querySelector("#humidity").textContent = (currentWeather.main.humidity);
    document.querySelector("#uvIndex").textContent = (currentWeather.uvi) //where is the UVI?
})


//REFERENCE THE API WHEN THE BUTTON IS CLICKED BASED ON THE CITYNAME
var getSearchedCityWeather = function() {
    var currentWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiKey}`)
    .then(function(cityName) {
        if (cityName.status !==200) {
            console.log("there was a problem, status code:" + cityName.status);
            return;
        }
        //Examine the text in the response
        cityName.json().then(function(data) {
            console.log(data);
        });
    })
    .catch(function(err) {
        console.log("Fetch error :-S", err);
    });

    console.log(currentWeather);
}


//SANITY CHECK console.log(currentDateAndTime);



//WEBSITE FOR 5 DAY FORECAST
//(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myApiKey}`)

//FOR LOOP FOR LOOPING THROUGH 5 DAY FORECAST
//for(var i=0; i+=8; i <= data.list.length){
    //console.log(data.list[i]) //show me that object
//}
//i+=8 lets us increment our iterating variable up by 8, rather than the common i++ incrementing by 1!
//You could even start off at i = 1-4 and it would probably do well