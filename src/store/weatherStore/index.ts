import { observable, computed, action } from 'mobx'

export interface IWeatherStore {
  now: any
  daily_forecast: any
  hourly: any
  air: any
  lifestyle: any
  today: any
  tomorrow: any
  setNow: (val: any) => void
  setDailyForecast: (val: any) => void
  setHourly: (val: any) => void
  setAir: (val: any) => void
  setLifestyle: (val: any) => void
}

class weatherStore implements IWeatherStore {
  @observable now = {} // 当前天气
  @observable daily_forecast = [] // 一周天气
  @observable hourly = [] // 时段天气
  @observable air = {} // 空气质量
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

export default weatherStore
