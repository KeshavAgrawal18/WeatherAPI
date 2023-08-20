const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;


const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));

function formatTimezoneShift(timezoneShiftInSeconds) {
  const currentTimestamp = Date.now(); // Current timestamp in local time
  const currentUTCTimestamp =
    currentTimestamp + new Date().getTimezoneOffset() * 60 * 1000; // Convert to UTC timestamp

  const adjustedTimestamp = currentUTCTimestamp + timezoneShiftInSeconds * 1000;

  const adjustedDate = new Date(adjustedTimestamp);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = adjustedDate.toLocaleString("en-US", options);
  return formattedDate;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //   const url =
  //     "https://api.openweathermap.org/data/2.5/weather?q=kishanganj,bihar&units=metric&appid=cd643b56e8d2c65fe0c4e6726892385a";

  //   https.get(url, (response) => {
  //     //console.log(response)
  //     console.log(response.statusCode);

  //     response.on("data", (data) => {

  //       const WeatherData = JSON.parse(data);
  //       const temp = WeatherData.main.temp;
  //       const weatherDescription = WeatherData.weather[0].description;
  //       const icon = WeatherData.weather[0].icon;
  //       const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

  //     //   console.log(temp);
  //     //   console.log(weatherDescription);

  //       res.write("<p>Weather Description is " + weatherDescription + "</p>");
  //       res.write("<h1>The temperature of Kishanganj is " + temp + " degree Celcius</h1>" );
  //       // console.log(iconUrl)
  //       res.write("<img src=" + iconUrl + ">");
  //       res.send();
  //    });
  //  });

  // res.send("Server is up and running.") \
});

app.post("/", (req, res) => {
  var city = req.body.city;
  const unit = "metric";
  const appKey = "cd643b56e8d2c65fe0c4e6726892385a";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=" +
    unit +
    "&appid=" +
    appKey;
  // console.log(url)
  https.get(url, (response) => {
    // console.log(response)
    console.log(response.statusCode);

    response.on("data", (data) => {

      const WeatherData = JSON.parse(data);
      const timeZone = WeatherData.timezone;
      console.log(timeZone);
      const time = formatTimezoneShift(timeZone);
      // console.log(time);
      // console.log(date);
      // console.log(WeatherData);

      const temp = WeatherData.main.temp;
      const temp_min = WeatherData.main.temp_min;
      const temp_max = WeatherData.main.temp_max;

      



      const feels_like = WeatherData.main.feels_like;
      const wind_Speed = WeatherData.wind.speed;
      console.log(feels_like);
      const weatherDescription = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const pressure = WeatherData.main.pressure;
      const humidity = WeatherData.main.humidity;
      console.log(humidity);
      const countryCode = WeatherData.sys.country;
      const cityName = WeatherData.name;
      // const humidityUnit = WeatherData.humidity.unit ;
      //   console.log(temp);
      //   console.log(weatherDescription);
      // res.write("<h1>" + city + "</h1>");
      // res.write("<h1>" + time + "</h1>");
      // res.write("<p>Weather Description is " + weatherDescription + "</p>");
      // res.write("<img src=" + iconUrl + ">");
      // res.write("<h5>Temperature: " + temp + " degree Celcius</h5>" );

      // res.write("<h3>Wind Speed: " + wind_Speed  );
      // console.log(iconUrl)
      res.render("index", {
        city: cityName,
        country: countryCode,
        time: time,
        weatherDescription: weatherDescription,
        iconUrl: iconUrl,
        temp: temp,
        temp_min: temp_min,
        temp_max: temp_max,
        feels_like: feels_like,
        wind_speed: wind_Speed,
        pressure: pressure,
        humidity: humidity

        // humidityUnit: humidityUnit
      });

      res.send();
    });
  });
  // res.send("Thanks for posting")
});

app.listen(PORT, (req, res) => {
  console.log("Server started on port " + PORT);
});
