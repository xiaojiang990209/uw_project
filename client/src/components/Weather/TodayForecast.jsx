import React from 'react';
import { PropTypes } from 'prop-types';
import utils from './utils/utils';
import './scss/TodayForecast.scss';
import WeatherIcon from './WeatherIcon';

const propTypes = {
  location: PropTypes.string.isRequired,
  todayData: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired
};

const TodayForecast = (props) => {
  const { location, todayData, unit, lang } = props;
  const todayIcon = utils.getIcon(todayData.icon);
  return (
   <div className="rw-main">
        <div className="rw-box-left">
          <h2>{location}</h2>
          <div className="date">{todayData.date}</div>
        </div>
        <div className="rw-box-middle">
          <WeatherIcon name={todayIcon} />
        </div>
        <div className="rw-box-right">
          <div className="temperature">
            <div className="range"> Max {todayData.temperature.max}°</div>
            <div className="current"> {todayData.temperature.current}°C</div>
            <div className="range"> Min {todayData.temperature.min}°</div>
          </div>
          <div className="info">
            <div>Wind: <b>{todayData.wind}</b> km/h</div>
            <div>Humidity: <b>{todayData.humidity}</b>%</div>
          </div>
        </div>
    </div>
  );
};

TodayForecast.propTypes = propTypes;

export default TodayForecast;
