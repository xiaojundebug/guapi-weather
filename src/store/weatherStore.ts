import { observable, computed, action } from 'mobx'
import Taro, { createContext, useContext } from '@tarojs/taro'
import locationStore from './locationStore'
import { HEFENG_BASE_URL, HEFENG_KEY } from '../common/const'
import { array2object } from '../common/utils'

// weatherStore 会用到 locationStore 内容
const ls = useContext(locationStore)

class WeatherStore {
  @observable now: any = {} // 当前天气
  @observable air: any = {} // 空气质量
  @observable hourly: any = [] // 时段天气
  @observable daily_forecast: any = [] // 一周天气
  @observable lifestyle: any = {} // 生活指数

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
    const { location } = ls
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/now',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      this.now = res.data.HeWeather6[0].now
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
      this.air = res.data.HeWeather6[0].air_now_city
    })
  }

  @action
  syncHourly = () => {
    const { location } = ls
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/hourly',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      this.hourly = res.data.HeWeather6[0].hourly
    })
  }

  @action
  syncDailyForecast = () => {
    const { location } = ls
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/forecast',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      this.daily_forecast = res.data.HeWeather6[0].daily_forecast
    })
  }

  @action
  syncLifestyle = () => {
    const { location } = ls
    return Taro.request({
      url: HEFENG_BASE_URL + 'weather/lifestyle',
      data: {
        location: location.latitude + ',' + location.longitude,
        key: HEFENG_KEY
      }
    }).then(res => {
      const lifestyle = res.data.HeWeather6[0].lifestyle as any[]
      this.lifestyle = array2object(lifestyle, 'type')
    })
  }
}

export default createContext(new WeatherStore())
