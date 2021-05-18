require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

const {API_KEY} = process.env
let data = {}

function capitalize(input) {  
    var words = input.split(' ');  
    var CapitalizedWords = [];  
    words.forEach(element => {  
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
}  

async function fetchWeather(city) {
    weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    data = {
        city: weather.data.name,
        description: weather.data.weather[0].description,
        icon: weather.data.weather[0].icon,
        temp: weather.data.main.temp,
        feels_like: weather.data.main.feels_like,
        temp_min: weather.data.main.temp_min,
        temp_max: weather.data.main.temp_max,
        humidity: weather.data.main.humidity,
        wind: weather.data.wind.speed        
    }
    data.description = capitalize(data.description)
    return data
}

router.get('/', async (req, res) => {
    weather_data = await fetchWeather("London")
    res.render('home', weather_data)
})

router.post('/', async (req, res) => {
    const city = req.body.searchCity
    console.log(city)
    weather_data = await fetchWeather(city)
    console.log(weather_data)
    res.render('home', weather_data)

})


module.exports = router