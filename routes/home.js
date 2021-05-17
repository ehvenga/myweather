require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require('axios')

const {API_KEY} = process.env

async function fetchWeather(city) {
    weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    return weather
}

router.get('/', (req, res) => {
    res.render('home')
})

router.post('/', async (req, res) => {
    const city = req.body.searchCity
    console.log(city)
    returnWeather = await fetchWeather(city)
    console.log(returnWeather.data)
    res.render('home')

})


module.exports = router