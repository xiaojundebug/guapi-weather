import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import '@tarojs/async-await'
import Weather from './pages/weather'
import { locationStore, weatherStore } from './store'

import './app.less'
import './assets/fonts/font_1279133_zcf4btattbf/iconfont.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  locationStore,
  weatherStore
}

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ['pages/weather/index'],
    window: {
      navigationBarTitleText: '瓜皮天气',
      navigationStyle: 'custom'
    },
    permission: {
      'scope.userLocation': {
        desc: '不授权没法查询你所在地天气数据哦'
      }
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Weather />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
