import { observable, action } from 'mobx'

class addressStore {
  @observable address = '北京' // 地址
  @observable location = {
    latitude: 30.25961, // 纬度
    longitude: 120.13026 // 经度
  }

  @action
  setAddress = val => {
    this.address = val
  }

  @action
  setLocation = val => {
    this.location = val
  }
}

export default new addressStore()
