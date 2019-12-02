import axios from 'axios';
import utils from './utils';

export default class OpenWeatherApi {
  constructor(unit, apiKey, lang) {
    this.unit = unit;
    this.apiKey = apiKey;
    this.baseApiUrl = '//api.openweathermap.org/data/2.5';
    this.lang = lang;
  }
  getForecast(args) {
    const endPointToday = `${this.baseApiUrl}/weather`;
    const params = Object.assign(
      {
        appid: this.apiKey,
        lang: this.lang,
        units: this.unit,
      },
      args
    );

    return axios.get(endPointToday, { params })
      .then(todayResponse => {
        const todayData = todayResponse.data;
        if (todayData) return this._map(todayData, params.lang);
        return {};
      });
  }

  _map(today, lang) {
    const mapped = {};
    mapped.location = today.name;
    mapped.days = [
      {
        date: utils.formatDate(today.dt, lang),
        description: today.weather[0] ? today.weather[0].main : null,
        icon: today.weather[0] ? today.weather[0].icon : null,
        temperature: {
          current: today.main.temp.toFixed(0),
          min: today.main.temp_min.toFixed(0),
          max: today.main.temp_max.toFixed(0),
        },
        wind: today.wind.speed.toFixed(0),
        humidity: today.main.humidity,
      }
    ]
    return mapped;
  }
}
