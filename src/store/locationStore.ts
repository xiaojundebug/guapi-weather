import { observable, action } from 'mobx'
import Taro, { createContext } from '@tarojs/taro'
import { GEOCODER_URL, QQ_MAP_KEY } from '../common/const'

class LocationStore {
  @observable address: any = '北京' // 地址
  @observable location: any = {
    latitude: 30.25961, // 纬度
    longitude: 120.13026 // 经度
  }

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
            Taro.showToast({ title: '检测到您未授权使用位置权限，请先开启哦', icon: 'none' })
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

export default createContext(new LocationStore())
