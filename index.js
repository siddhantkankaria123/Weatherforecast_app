let containerTwo = document.getElementById("containertwo");
let city = document.getElementById("city");
let temp = document.getElementById("temp");
let lon = document.getElementById("lon");
let lat = document.getElementById("lat");
let humid = document.getElementById("humid");
let windspeed = document.getElementById("windspeed");
let API_key = `7c972d8ea0147a643ec41571e79734d2`;
let day = document.getElementById("day");
let month = document.getElementById("month");
let date = document.getElementById("date");
let year = document.getElementById("year");
let cityName = document.getElementById("cityName");
let weatherImage = document.getElementById("weatherImage");
let windImage = document.getElementById("windImage");
let humidImage = document.getElementById("humidImage");
var ul_list = document.getElementById("ul_list");
var ul_list_two = document.getElementById("ul_list_two");
var ul_list_three = document.getElementById("ul_list_three");
let next_days_container = document.getElementById("next_day");

function go(e) {
  if (city.value == "") {
    alert("please Enter City Name");
  } else {
    getData(city.value);
    console.log(city.value);
  }
}
async function getData(city) {
  //current weather API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

  //  next 5 day 3 hour weather API
  const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`;

  //  current weather data
  const response = await fetch(url);
  const data = await response.json();

  // hourly weather data
  const hourly_response = await fetch(hourlyUrl);
  const hourly_data = await hourly_response.json();
  // console.log(hourly_data.list[0].main.temp);
  // console.log(hourly_data.list[0].dt_txt);

  // console.log(hourly_data);
  if (data.cod == "404") {
    containerTwo.style.display = "none";
    next_days_container.style.display = "none";
    alert("city not found");
  } else {
    containerTwo.style.display = "block";
    next_days_container.style.display = "block";
    cityName.innerHTML = city;

    windImage.innerHTML = `<i class="fa-solid fa-wind"></i>`;
    humidImage.innerHTML = `<img src="humidity.png" height = "30px" />`;
    weatherImage.innerHTML = `  <img id="weather-image" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"  alt="" height="150px" />
    <div>${data.weather[0].description}</div> `;
    // weatherImage.style.display = "flex";
    // weatherImage.style.flexDirection = "column";
    // weatherImage.style.fontSize = "1.5rem";

    // weatherImage.style.gap = "2rem";
    weatherImage.style.textAlign = "center";
    temp.innerHTML = `${data.main.temp} °c`;
    lon.innerHTML = `lon: ${data.coord.lon}`;
    lat.innerHTML = `lat: ${data.coord.lat}`;
    humid.innerHTML = `Humidity: ${data.main.humidity}% `;
    windspeed.innerHTML = `Wind Speed: ${data.wind.speed} Km/h`;

    let x = new Date();
    date.innerHTML = x.getDate();
    year.innerHTML = x.getFullYear();
    let currentMonth = x.getMonth();
    // console.log(currentMonth);
    switch (currentMonth) {
      case 0:
        month.innerHTML = +"Jan";
        break;
      case 1:
        month.innerHTML = "Feb";
        break;
      case 2:
        month.innerHTML = "March ";
        break;
      case 3:
        month.innerHTML = "Apr ";
        break;
      case 4:
        month.innerHTML = "May ";
        break;
      case 5:
        month.inerHTML = "Jun ";
        break;
      case 6:
        month.innerHTML = "July ";
        break;
      case 7:
        month.innerHTML = "Aug ";
        break;
      case 8:
        month.innerHTML = "Sept ";
        break;
      case 9:
        month.innerHTML = "Oct ";
        break;
      case 10:
        month.innerHTML = "Nov ";
        break;
      case 11:
        month.innerHTML = "Dec ";
        break;
    }
    let day = document.getElementById("day");

    let currentDay = x.getDay();
    console.log(currentDay);
    switch (currentDay) {
      case 0:
        day.innerHTML = " Sun";
        break;
      case 1:
        day.innerHTML = "Mon";
        break;
      case 2:
        day.innerHTML = "Tues ";
        break;
      case 3:
        day.innerHTML = "Wed ";
        break;
      case 4:
        day.innerHTML = "Thru ";
        break;
      case 5:
        day.inerHTML = "Fri ";
        break;
      case 6:
        day.innerHTML = "Sat ";
        break;
    }
    if (hourly_response.ok) {
      ul_list.innerHTML = "";
      const forecastList = hourly_data.list.slice(0, 5);
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };

      for (let i = 0; i < forecastList.length; i++) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);
        const dateString = date.toLocaleDateString("en-US", options);
        const timeString = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description;

        const forecastItem = document.createElement("li");
        forecastItem.innerHTML = `${dateString} , ${timeString}-<span>${weatherDescription} -${temperature}</span>°C`;
        forecastItem.className = "forecast";
        ul_list.appendChild(forecastItem);
      }
    } else {
      alert(`Error: ${hourly_data.message}`);
    }
    if (hourly_response.ok) {
      // Clear existing forecast data
      ul_list_two.innerHTML = "";

      // Extract and display the forecast data
      const forecastList_two = hourly_data.list.slice(6, 11);
      const options_two = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };

      for (let j = 0; j < forecastList_two.length; j++) {
        const forecast_two = forecastList_two[j];
        // console.log(forecast_two);
        const date_two = new Date(forecast_two.dt * 1000);
        const dateString_two = date_two.toLocaleDateString(
          "en-US",
          options_two
        );
        const timeString_two = date_two.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const temperature_two = forecast_two.main.temp;
        console.log(temperature_two);
        const weatherDescription_two = forecast_two.weather[0].description;

        const forecastItem_two = document.createElement("li");
        forecastItem_two.innerHTML = `${dateString_two} , ${timeString_two} -  <span>${weatherDescription_two} -${temperature_two}</span>°C`;
        forecastItem_two.className = "forecast";
        ul_list_two.appendChild(forecastItem_two);
      }
    } else {
      alert(`Error: ${hourly_data.message}`);
    }
    if (hourly_response.ok) {
      // Clear existing forecast data
      ul_list_three.innerHTML = "";

      // Extract and display the forecast data
      const forecastList_three = hourly_data.list.slice(11, 16);
      const options_three = {
        weekday: "short",
        month: "short",
        day: "numeric",
      };

      for (let k = 0; k < forecastList_three.length; k++) {
        const forecast_three = forecastList_three[k];
        // console.log(forecast_two);
        const date_three = new Date(forecast_three.dt * 1000);
        const dateString_three = date_three.toLocaleDateString(
          "en-US",
          options_three
        );
        const timeString_three = date_three.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const temperature_three = forecast_three.main.temp;
        // console.log(temperature_two);
        const weatherDescription_three = forecast_three.weather[0].description;

        const forecastItem_three = document.createElement("li");
        forecastItem_three.innerHTML = `${dateString_three} , ${timeString_three}-<span>${weatherDescription_three} -${temperature_three}</span>°C`;
        forecastItem_three.className = "forecast";
        ul_list_three.appendChild(forecastItem_three);
      }
    } else {
      alert(`Error: ${hourly_data.message}`);
    }
  }
}
