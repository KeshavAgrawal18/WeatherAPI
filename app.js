const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
 
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {


  res.sendFile(__dirname + "/index.html")
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

app.post("/",(req,res)=>{
  var city = req.body.city;
  const unit = "metric";
  const appKey = "cd643b56e8d2c65fe0c4e6726892385a";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + appKey;
 // console.log(url)  
  https.get(url, (response) => {
   // console.log(response)
    console.log(response.statusCode);

    response.on("data", (data) => {

      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const weatherDescription = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    //   console.log(temp);
    //   console.log(weatherDescription);

      res.write("<p>Weather Description is " + weatherDescription + "</p>");
      res.write("<h1>The temperature of " + city + " is " + temp + " degree Celcius</h1>" );
      // console.log(iconUrl)
      res.write("<img src=" + iconUrl + ">");
      res.send();
    })
  })
  // res.send("Thanks for posting")
})

app.listen(3000, (req, res) => {
  console.log("Server started on port 3000.");
});
 