import LocationStore, { ILocationStore } from './locationStore'
import WeatherStore, { IWeatherStore } from './weatherStore'

const locationStore = new LocationStore()
const weatherStore = new WeatherStore()

export { locationStore, ILocationStore, weatherStore, IWeatherStore }
