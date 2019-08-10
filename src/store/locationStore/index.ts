import { observable, action } from 'mobx'
import Taro from '@tarojs/taro'
import { GEOCODER_URL, QQ_MAP_KEY } from '../../const'

export interface ILocationStore {
  address: string
  location: {
    latitude: number
    longitude: number
  }
  syncLocation: () => Promise<any>
  setAddress: (val: any) => void
  setLocation: (val: any) => void
}

class LocationStore implements ILocationStore {
  @observable address = '北京' // 地址
  @observable location = {
    latitude: 30.25961, // 纬度
    longitude: 120.13026 // 经度
  }

  @action
  syncLocation = () => {
    return new Promise((resolve, reject) => {
      Taro.getLocation({ type: 'gcj02' })
        // 拿到当前坐标
        .then(
          res => {
            return Taro.request({
              url: GEOCODER_URL,
              data: {
                location: res.latitude + ',' + res.longitude,
                key: QQ_MAP_KEY
              }
            })
          },
          () => {
            Taro.showToast({
              title: '检测到您未授权使用位置权限，请先开启哦',
              icon: 'none',
              duration: 3000
            })
            reject()
          }
        )
        // 根据坐标拿到地址
        .then(({ data }: any) => {
          if (data.status !== 0) {
            Taro.showToast({
              title: data.message,
              icon: 'none',
              duration: 3000
            })
            return reject()
          }

          this.setAddress(data.result.address)
          this.setLocation({
            latitude: data.result.location.lat,
            longitude: data.result.location.lng
          })
          resolve()
        })
    })
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

export default LocationStore
