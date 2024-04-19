/* eslint-disable no-console */
import { Card, Col, Typography } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

interface WeatherData {
  current?: {
    temp_f: number
    humidity: number
    wind_mph: number
    wind_dir: number
    precip_in: number
    condition: {
      icon: string
      text: string
    }
  }
  location?: {
    name: string
  }
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({})

  const getWeatherData = async (latitude: number, longitude: number) => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: `${latitude},${longitude}` },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }
    try {
      const response = await axios.request(options)
      setWeatherData(response.data)
    } catch (error) {
      console.error(error)
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
  }, [])

  return (
    <Card>
      <Col className='Column-wrapper'>
        <Typography.Title level={4} className='Heading' type='secondary'>
          Weather
        </Typography.Title>
        <Typography.Title level={4} className='Heading' type='secondary'>
          {weatherData?.location?.name}
        </Typography.Title>
      </Col>
      <Col className='Wrapper'>
        <Col>
          <img src={weatherData?.current?.condition?.icon} alt='icon' />
        </Col>
        <Col>
          <Typography.Title level={5} className='Title'>
            {weatherData?.current?.condition?.text}
          </Typography.Title>
          <Typography.Title level={5} className='Title'>
            Temp: {weatherData.current?.temp_f} F
          </Typography.Title>
        </Col>
        <Col>
          {' '}
          <Typography.Title level={5} className='Title'>
            Wind:{weatherData.current?.wind_mph} MPH, {weatherData.current?.wind_dir}
          </Typography.Title>
          <Typography.Title level={5} className='Title'>
            Humidity: {weatherData.current?.humidity}%
          </Typography.Title>
          <Typography.Title level={5} className='Title'>
            Percipitation: {weatherData.current?.precip_in}
          </Typography.Title>
        </Col>
      </Col>
      <Col>
        <Typography.Title level={5} className='Title'>
          Powered by Weather
        </Typography.Title>
        {/* <Typography.Title level={5} className='Title'>
          show more
        </Typography.Title> */}
      </Col>
    </Card>
  )
}

export default Weather
