import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import './common/promise-polyfill'
import Index from './pages/index'
import './app.less'
import './assets/fonts/font_1279133_zcf4btattbf/iconfont.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '发现新版本',
        content: '精彩等你来发现～',
        cancelText: '下次再说',
        confirmText: '马上更新',
        cancelColor: '#999',
        confirmColor: '#f3cc49',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  }

  config: Taro.Config = {
    pages: ['pages/Index/index'],
    window: {
      navigationBarTitleText: '瓜皮天气'
    },
    permission: {
      'scope.userLocation': {
        desc: '不授权没法查询你所在地天气数据哦'
      }
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
