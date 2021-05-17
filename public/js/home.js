require('dotenv').config()

const {API_KEY} = process.env

function requestWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data))
}
requestWeather()
