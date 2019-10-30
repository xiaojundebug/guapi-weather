import Taro, {
  useContext,
  usePullDownRefresh,
  useShareAppMessage,
  useEffect,
  useLayoutEffect,
  useCallback
} from '@tarojs/taro'
import { View, CoverView, Text, ScrollView, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { locationStore, weatherStore } from '../../store'
import WeatherIcon from '../../components/WeatherIcon'
import { dateFormat, getBackgroundByCode, getDayOfWeek } from '../../common/utils'
import { useThrottle } from '../../common/hooks'
import lifestyleConf from '../../common/lifestyle.conf.json'
import './index.less'

let chartDetail = null
const menuRect = Taro.getMenuButtonBoundingClientRect()
const locationBarStyle = {
  margin: `${menuRect.top}px auto 0 auto`,
  height: `${menuRect.height}px`
}

const Weather: Taro.FC = () => {
  const {
    now,
    today,
    daily_forecast,
    hourly,
    air,
    lifestyle,
    syncNow,
    syncAir,
    syncDailyForecast,
    syncHourly,
    syncLifestyle
  } = useContext(weatherStore)
  const { address, syncLocation, setAddress, setLocation } = useContext(locationStore)

  usePullDownRefresh(async () => {
    Taro.vibrateShort()
    try {
      await fetchData()
    } catch (error) {}
    Taro.stopPullDownRefresh()
  })

  useShareAppMessage(() => {
    return {
      title: '我发现一个好看的天气小程序，分享给你看看',
      path: '/pages/Weather/index'
    }
  })

  useEffect(() => {
    syncLocation().then(fetchData)
    // eslint-disable-next-line
  }, [])

  useLayoutEffect(() => {
    function initChart() {
      const { F2, canvas, width, height } = chartDetail as any
      const data = daily_forecast.map(el => ({
        date: el.date,
        tmp_max: Number(el.tmp_max),
        tmp_min: Number(el.tmp_min)
      }))

      const chart = new F2.Chart({
        el: canvas,
        padding: [30, 0, 30, 0],
        syncY: true,
        width,
        height
      })
      chart.source(data)
      // 不显示坐标轴
      chart.axis(false)
      // 不显示提示
      chart.tooltip(false)
      // 画线
      chart
        .line()
        .position('date*tmp_max')
        .shape('smooth')
        .style({ stroke: '#f3cc49', lineWidth: 2 })
      chart
        .line()
        .position('date*tmp_min')
        .shape('smooth')
        .style({ stroke: '#4091f7', lineWidth: 2 })
      // 画点
      chart
        .point()
        .position('date*tmp_max')
        .style({
          stroke: '#f3cc49',
          fill: '#fff',
          lineWidth: 2,
          r: 4
        })
      chart
        .point()
        .position('date*tmp_min')
        .style({
          stroke: '#4091f7',
          fill: '#fff',
          lineWidth: 2,
          r: 4
        })

      data.map(function(obj: any) {
        // 画文本
        chart.guide().text({
          position: [obj.date, obj.tmp_max],
          content: obj.tmp_max + '°',
          style: {
            fill: '#f3cc49',
            textAlign: 'center',
            fontSize: 13
          },
          offsetY: -15
        })
        chart.guide().text({
          position: [obj.date, obj.tmp_min],
          content: obj.tmp_min + '°',
          style: {
            fill: '#4091f7',
            textAlign: 'center',
            fontSize: 13
          },
          offsetY: 15
        })
      })
      chart.render()
    }
    if (daily_forecast.length > 0) initChart()
  }, [daily_forecast])

  const fetchData = useThrottle(
    () => {
      Taro.showLoading({ title: '拼命请求中', mask: true })
      return Promise.all([
        syncNow(),
        syncAir(),
        syncHourly(),
        syncDailyForecast(),
        syncLifestyle()
      ]).finally(() => {
        Taro.hideLoading()
      })
    },
    10000,
    () => {
      Taro.showToast({ title: '已经更新过了哦~', icon: 'none' })
    }
  )

  const chooseLocation = useCallback(() => {
    Taro.chooseLocation().then(res => {
      setAddress(res.address)
      setLocation({ latitude: res.latitude, longitude: res.longitude })
      fetchData()
    })
    // eslint-disable-next-line
  }, [])

  return (
    <View
      className='container'
      style={{ backgroundImage: `url(${getBackgroundByCode(now.cond_code)})` }}
    >
      <View className='location' style={locationBarStyle} onClick={chooseLocation}>
        <Text className='icon icon-location' />
        <Text className='address ellipsis'>{address}</Text>
      </View>

      <View className='now'>
        <View className='curr-tmp'>
          <Text>{now.tmp || 'N/A'}°</Text>
        </View>
        <View className='weather'>
          <Text className='cond_txt'>{now.cond_txt || '未知'}</Text>
          <Text className='tmp-range'>
            {today.tmp_min || 'N/A'} ~ {today.tmp_max || 'N/A'}°
          </Text>
        </View>
      </View>

      <View className='detail'>
        <View className='block'>
          <View className='value'>{air.qlty || '未知'}</View>
          <View className='label'>空气</View>
        </View>
        <View className='block'>
          <View className='value'>{now.hum ? now.hum + '%' : '未知'}</View>
          <View className='label'>湿度</View>
        </View>
        <View className='block'>
          <View className='value'>
            {now.wind_dir ? `${now.wind_dir} ${now.wind_sc}级` : '未知'}
          </View>
          <View className='label'>风向</View>
        </View>
      </View>

      {/* 时段 */}
      <ScrollView className='hourly' scrollX>
        <View className='content'>
          {hourly.map(el => {
            return (
              <View className='item' key={el.date}>
                <Text>{dateFormat(el.time, 'hh:mm')}</Text>
                <WeatherIcon cond_code={el.cond_code} />
                <Text>{el.cond_txt}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>

      {/* 七天内 */}
      <View className='week'>
        <View className='top'>
          {daily_forecast.map(el => {
            return (
              <View className='item' key={el.date}>
                <Text>{getDayOfWeek(el.date)}</Text>
                <WeatherIcon cond_code={el.cond_code_d} />
                <Text>{el.cond_txt_d}</Text>
              </View>
            )
          })}
        </View>
        <ff-canvas canvas-id='line-chart' onInit={({ detail }) => (chartDetail = detail)} />
        <View className='bottom'>
          {daily_forecast.map(el => {
            return (
              <View className='item' key={el.date}>
                <WeatherIcon cond_code={el.cond_code_n} />
                <Text>{el.cond_txt_n}</Text>
                {/* <Text>{el.wind_dir}</Text> */}
              </View>
            )
          })}
        </View>
        {/* 由于图表会阻碍滑动，这里放个View覆盖一下 */}
        <CoverView className='mask' />
      </View>

      {/* 生活指数 */}
      <View className='lifestyle'>
        {lifestyleConf.map(el => (
          <View className='item' key={el.type}>
            <Text className={`icon ${el.icon}`} />
            <View className='text-content'>
              <Text>
                {el.title} {lifestyle[el.type].brf}
              </Text>
              <Text>{lifestyle[el.type].txt}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 底部小文本 */}
      <Image className='footer' src={require('../../assets/images/footer.png')} />
    </View>
  )
}

Weather.config = {
  usingComponents: {
    'ff-canvas': '../../lib/f2-canvas/f2-canvas'
  },
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black',
  enablePullDownRefresh: true
}

export default observer(Weather)
