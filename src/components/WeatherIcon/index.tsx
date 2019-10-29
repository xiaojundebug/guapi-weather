import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import './index.less'

interface IProps {
  cond_code: string | number
}

const WeacherIcon: Taro.FC<IProps> = props => {
  return (
    <View className="icon">
      <Image src={`https://cdn.heweather.com/cond_icon/${props.cond_code}.png`} />
    </View>
  )
}

WeacherIcon.options = {
  addGlobalClass: true
}

WeacherIcon.defaultProps = {
  cond_code: '999'
}

export default WeacherIcon
