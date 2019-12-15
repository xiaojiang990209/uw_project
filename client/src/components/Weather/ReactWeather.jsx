import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import OpenWeatherApi from './utils/OpenWeatherApi';
import TodayForecast from './TodayForecast';
import './scss/ReactWeather.scss';
import { TodayForecastContainer } from './component';

const propTypes = {
  unit: PropTypes.oneOf(['metric', 'imperial']),
  type: PropTypes.oneOf(['geo', 'city']),
  lat: PropTypes.string,
  lon: PropTypes.string,
  city: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  lang: PropTypes.string,
};

const defaultProps = {
  unit: 'metric',
  type: 'city',
  forecast: 'today',
  lang: 'en',
};

function ReactWeather(props) {
  const [data, setData] = useState(null);
  const api = new OpenWeatherApi(props.unit, props.apiKey, props.lang);
  const _getParams = () => ({ q: props.city, lang: props.lang });
  const getForecastData = () => {
    const params = _getParams();
    api.getForecast(params)
      .then(data => setData(data))
      .catch(err => console.log(err.response));
  };

  useEffect(getForecastData, []);

  let content = <div>Loading...</div>;
  if (data) {
    const today = data.days[0];
    content = (
      <TodayForecastContainer>
        <TodayForecast location={data.location} todayData={today}
          unit={props.unit} lang={props.lang} />
      </TodayForecastContainer>
    );
  }

  return <>{content}</>;
}

ReactWeather.propTypes = propTypes;
ReactWeather.defaultProps = defaultProps;

export default ReactWeather;