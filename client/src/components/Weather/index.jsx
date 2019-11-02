import React from 'react';
import ReactWeather from './ReactWeather';
import { OPEN_WEATHER_API_KEY } from '../../utils/secrets';

function Weather(props) {
  return (
    <ReactWeather
      forecast="today"
      apikey={`${OPEN_WEATHER_API_KEY}`}
      type="city"
      city="waterloo,ca"/>
  )
}

export default Weather;