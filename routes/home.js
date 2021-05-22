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

function convertData(weather) {
    data = {
        city: weather.data.name,
        description: weather.data.weather[0].description,
        icon: weather.data.weather[0].icon,
        temp: weather.data.main.temp,
        feels_like: weather.data.main.feels_like,
        temp_min: weather.data.main.temp_min,
        temp_max: weather.data.main.temp_max,
        humidity: weather.data.main.humidity,
        wind: weather.data.wind.speed,
        err: weather.err        
    }
    data.description = capitalize(data.description)
    return data
}

async function fetchWeather(city) {
    try {
        weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        return convertData(weather)
    } catch (error) {
        try {
            weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${API_KEY}`)
            weather.err = "Please Enter Valid City"
            return convertData(weather)
        } catch (error) {
            weather.err = "Please Enter Valid City"
            return weather
        }
    }
}

async function geoLocationWeather(lat,long) {
    try {
        weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        return convertData(weather)
    } catch (error) {
        console.log(error)
    }
}

router.get('/', async (req, res) => {
    weather_data = await fetchWeather("London")
    res.render('home', weather_data)
})

router.post('/', async (req, res) => {
    const city = req.body.searchCity
    console.log(city)
    try {
        weather_data = await fetchWeather(city)
        console.log(weather_data)
        res.render('home', weather_data)
    } catch (error) {
        weather_data.err="Please Enter a Valid City"
        res.render('home', weather_data)
    }

})

router.post('/geolocation', async (req, res) => {
    console.log(req.body)
    weather_data = await geoLocationWeather(req.body.lat, req.body.long)
    res.render('home', weather_data)
})

router.get('/geolocation', async (req, res) => {
    res.redirect('/')
})


module.exports = router