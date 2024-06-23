import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port =  3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const url = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "5bbd44194853868f388d7491b43fc039";

app.get("/", (req, res) => {
    res.render("index.ejs", {
        name: null,
        temp: null,
        weather: null,
        wind: null,
        humidity: null,
        latitude: null,
        longitude: null
    });
});

app.post("/forecast", async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    try {
        const response = await axios.get(url, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
                units: "metric" 
            }
        });

        res.render("index.ejs", {
            name: response.data.name,
            temp: response.data.main.temp,
            weather: response.data.weather[0].main,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            latitude: latitude,
            longitude: longitude
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from OpenWeatherMap API');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
