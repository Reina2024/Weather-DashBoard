const apiKey = "e1fb16935028f3a98177a7d7a2d4d615";
const searchInput = document.querySelector("#searchInput");
const cityButtons = document.querySelector(".recentCities");
const searchButton = document.querySelector("#searchButton");

const storedCities = JSON.parse(localStorage.getItem("cities")) || [];

function searchCity(newCity) {
    console.log(newCity);
    let cityName = newCity;
    console.log(cityName);
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        renderCurrentWeather(cityName, data);
        storeSearchedCities(cityName);
        displayRecentSearch();
        console.log(searchInput);
        // searchInput.value = "";
      });
    } else {
      alert("error");
    }
  });
}
function renderCurrentWeather(city, weather) {
    console.log(weather);
    const currentWeatherDiv = document.querySelector("#currentWeather");
  
    currentWeatherDiv.textContent = "";
  
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humidity = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    console.log(iconUrl);
    console.log(humidity);
    console.log(temp);
    const cityField = document.createElement("h2");
    const tempField = document.createElement("p");
    const windField = document.createElement("p");
    const humidityField = document.createElement("p");
    const iconField = document.createElement("img");
  
    cityField.textContent = city;
    tempField.textContent = `Temp: ${temp}`;
    windField.textContent = `Wind:${wind}`;
    humidityField.textContent = `Humidity: ${humidity}`;
    iconField.setAttribute("src", iconUrl);
  
    currentWeatherDiv.append(
      cityField,
      iconField,
      tempField,
      windField,
      humidityField
    );
  }
  
  // history of searched cities
  function storeSearchedCities(city) {
    storedCities.push(city);
    console.log(storedCities);
    localStorage.setItem("cities", JSON.stringify(storedCities));
  }
  
  function displayRecentSearch() {
    const recentSearchDiv = document.querySelector(".recentCities");
    recentSearchDiv.textContent = "";
    console.log("in display");
    for (city of storedCities) {
      const cityButton = document.createElement("button");
      cityButton.setAttribute("class", "recentCities");
      cityButton.textContent = city;
      recentSearchDiv.append(cityButton);
    }
  }
  
  function handleSearchHistory(e) {
   
    console.log("inside button");
    console.log(e.target.textContent);
   
    searchCity(e.target.textContent);
}

searchButton.addEventListener("click", () => {
  let searchInputValue = searchInput.value;
  if (searchInputValue) {
    searchCity(searchInputValue);
    searchInput.value = "";
    console.log("outside");
  }
});

cityButtons.addEventListener("click", handleSearchHistory);
displayRecentSearch();
