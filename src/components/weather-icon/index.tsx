import Taro, { Component } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'

import './index.less'

interface IProps {
  cond_code: string | number
}

class Index extends Component<IProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: IProps = {
    cond_code: '999'
  }

  render() {
    const { cond_code } = this.props

    return (
      <View className="icon">
        <Image src={`https://cdn.heweather.com/cond_icon/${cond_code}.png`} />
      </View>
    )
  }
}

export default Index
