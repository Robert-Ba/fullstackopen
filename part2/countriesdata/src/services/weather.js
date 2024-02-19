import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = import.meta.env.VITE_WEATHER_KEY

// EXAMPLE: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const get = (lat, lon) => (
  axios
    .get(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(res => res.data)
)

export default { get }