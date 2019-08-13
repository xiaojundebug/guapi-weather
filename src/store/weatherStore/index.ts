import { observable, computed, action } from 'mobx'
import Taro from '@tarojs/taro'
import { locationStore } from '../'
import { HEFENG_BASE_URL, HEFENG_KEY } from '../../const'
import { array2object } from '../../utils'

export interface IWeatherStore {
  now: any
  air: any
  hourly: any
  daily_forecast: any
  lifestyle: any
  today: any
  tomorrow: any
  syncNow: () => Promise<any>
  syncAir: () => Promise<any>
  syncDailyForecast: () => Promise<any>
  syncHourly: () => Promise<any>
  syncLifestyle: () => Promise<any>
  setNow: (val: any) => void
  setDailyForecast: (val: any) => void
  setHourly: (val: any) => void
  setAir: (val: any) => void
  setLifestyle: (val: any) => void
}

class WeatherStore implements IWeatherStore {
  @observable now = {} // 当前天气
  @observable air = {} // 空气质量
  @observable hourly = [] // 时段天气
  @observable daily_forecast = [] // 一周天气
  @observable lifestyle: {} // 生活指数
  // 今天天气
  @computed get today() {
    return this.daily_forecast.length ? this.daily_forecast[0] : {}
  }
  // 明天天气
  @computed get tomorrow() {
    return this.daily_forecast.length ? this.daily_forecast[1] : {}
  }

  @action
  syncNow = () => {
    const { location } = locationStore
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/now',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      const now = res.data.HeWeather6[0].now
      this.setNow(now)
    })
  }

  @action
  syncAir = () => {
    return Taro.request({
      url: HEFENG_BASE_URL + 'air/now',
      data: {
        location: 'auto_ip',
        key: HEFENG_KEY
      }
    }).then(res => {
      const air = res.data.HeWeather6[0].air_now_city
      this.setAir(air)
    })
  }

  @action
  syncHourly = () => {
    const { location } = locationStore
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/hourly',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      const hourly = res.data.HeWeather6[0].hourly
      this.setHourly(hourly)
    })
  }

  @action
  syncDailyForecast = () => {
    const { location } = locationStore
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/forecast',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      const daily_forecast = res.data.HeWeather6[0].daily_forecast
      this.setDailyForecast(daily_forecast)
    })
  }

  @action
  syncLifestyle = () => {
    const { location } = locationStore
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/lifestyle',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      const lifestyle = res.data.HeWeather6[0].lifestyle
      this.setLifestyle(array2object(lifestyle, 'type'))
    })
  }

  @action
  setNow = val => {
    this.now = val
  }

  @action
  setDailyForecast = val => {
    this.daily_forecast = val
  }

  @action
  setHourly = val => {
    this.hourly = val
  }

  @action
  setAir = val => {
    this.air = val
  }

  @action
  setLifestyle = val => {
    this.lifestyle = val
  }
}

export default new WeatherStore()
