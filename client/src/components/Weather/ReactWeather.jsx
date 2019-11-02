import React from 'react';
import { PropTypes } from 'prop-types';
import OpenWeatherApi from './utils/OpenWeatherApi';
import TodayForecast from './TodayForecast';
import './scss/ReactWeather.scss';

const propTypes = {
  unit: PropTypes.oneOf(['metric', 'imperial']),
  type: PropTypes.oneOf(['geo', 'city']),
  lat: PropTypes.string,
  lon: PropTypes.string,
  city: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  lang: PropTypes.string,
};

const defaultProps = {
  unit: 'metric',
  type: 'city',
  forecast: 'today',
  lang: 'en',
};

class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
    this.api = new OpenWeatherApi(props.unit, props.apikey, props.lang);
    this.state = {
      data: null,
    };
  }
  render() {
    const { unit, lang } = this.props;
    const data = this.state.data;
    if (data) {
      const days = data.days;
      const today = days[0];
      return (
        <div className="rw-box">
            <TodayForecast location={data.location} todayData={today} unit={unit} lang={lang} />
       </div>
      );
    }
    return <div>Loading...</div>;
  }
  componentDidMount() {
    this.getForecastData();
  }
  getForecastData() {
    const self = this;
    const params = self._getParams();
    let promise = null;
    promise = self.api.getForecast(params);
    promise.then(data => {
      self.setState({
        data,
      });
    });
  }
  _getParams() {
    const { type, lon, lat, city, lang } = this.props;
    switch (type) {
      case 'city':
        return { q: city, lang };
      case 'geo':
        return {
          lat,
          lon,
          lang,
        };
      default:
        return {
          q: 'auto:ip',
          lang,
        };
    }
  }
}

ReactWeather.propTypes = propTypes;
ReactWeather.defaultProps = defaultProps;

export default ReactWeather;
