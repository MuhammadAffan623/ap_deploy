// src/components/Weather.tsx
import React, { useState, useEffect } from 'react'

interface WeatherData {
  main?: {
    temp: number
    humidity: number
  }
  wind?: {
    speed: number
    deg: number
  }
  rain?: {
    '1h': number
  }
  name?: string
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({})
  const [apiKey] = useState('YOUR_OPENWEATHERMAP_API_KEY')

  const getWeatherData = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
      )
      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            getWeatherData(latitude, longitude)
          },
          (error) => {
            console.error('Error getting location:', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    }

    getLocation()
  }, []) // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData.main && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>
            Wind: {weatherData.wind?.speed} MPH, {weatherData.wind?.deg}°
          </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Precipitation: {weatherData.rain ? weatherData.rain['1h'] : 0.0}</p>
        </div>
      )}
    </div>
  )
}

export default Weather
