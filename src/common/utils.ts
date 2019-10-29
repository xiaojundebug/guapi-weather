function dateFormat(date: string, fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  const d = new Date(date.replace(/-/g, '/'))
  var o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

function array2object<T extends object, K extends keyof T>(arr: T[], key: K) {
  const result = {}
  arr.forEach(el => {
    result[el[key] as any] = el
    delete el[key]
  })
  return result
}

// 根据天气 code 设置背景图
function getBackgroundByCode(cond_code: number | string) {
  cond_code = Number(cond_code)
  let url = ''
  switch (cond_code) {
    case 100:
      url = 'https://s2.ax1x.com/2019/07/30/eGmf4s.png'
      break // 晴
    case 101:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 多云
    case 102:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 少云
    case 103:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 晴间多云
    case 104:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 阴
    case 200:
      url = 'https://s2.ax1x.com/2019/07/30/eGmf4s.png'
      break // 有风
    case 201:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 平静
    case 202:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 微风
    case 203:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 和风
    case 204:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 清风
    case 205:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 强风/劲风
    case 206:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 疾风
    case 207:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 大风
    case 208:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 烈风
    case 209:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 风暴
    case 210:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 狂爆风
    case 211:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 飓风
    case 212:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 龙卷风
    case 213:
      url = 'https://s2.ax1x.com/2019/07/30/eGm7uT.png'
      break // 热带风暴
    case 300:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 阵雨
    case 301:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 强阵雨
    case 302:
      url = 'https://s2.ax1x.com/2019/07/30/eGmovV.png'
      break // 雷阵雨
    case 303:
      url = 'https://s2.ax1x.com/2019/07/30/eGmovV.png'
      break // 强雷阵雨
    case 304:
      url = 'https://s2.ax1x.com/2019/07/30/eGmovV.png'
      break // 雷阵雨伴有冰雹
    case 305:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 小雨
    case 306:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 中雨
    case 307:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 大雨
    case 308:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 极端降雨
    case 309:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 毛毛雨/细雨
    case 310:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 暴雨
    case 311:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 大暴雨
    case 312:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 特大暴雨
    case 313:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 冻雨
    case 314:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 小到中雨
    case 315:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 中到大雨
    case 316:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 大到暴雨
    case 317:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 暴雨到大暴雨
    case 318:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 大暴雨到特大暴雨
    case 399:
      url = 'https://s2.ax1x.com/2019/07/30/eG2Szj.png'
      break // 雨
    case 400:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 小雪
    case 401:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 中雪
    case 402:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 大雪
    case 403:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 暴雪
    case 404:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 雨夹雪
    case 405:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 雨雪天气
    case 406:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 阵雨夹雪
    case 407:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 阵雪
    case 408:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 小到中雪
    case 409:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 中到大雪
    case 410:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 大到暴雪
    case 499:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 雪
    case 500:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 薄雾
    case 501:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 雾
    case 502:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 霾
    case 503:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 扬沙
    case 504:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 浮尘
    case 507:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 沙尘暴
    case 508:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 强沙尘暴
    case 509:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 浓雾
    case 510:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 强浓雾
    case 511:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 中度霾
    case 512:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 重度霾
    case 513:
      url = 'https://s2.ax1x.com/2019/07/30/eGuwlt.png'
      break // 严重霾
    case 514:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 大雾
    case 515:
      url = 'https://s2.ax1x.com/2019/07/30/eGcj29.png'
      break // 特强浓雾
    case 900:
      url = 'https://s2.ax1x.com/2019/07/30/eGmf4s.png'
      break // 热
    case 901:
      url = 'https://s2.ax1x.com/2019/07/30/eGm4Cn.png'
      break // 冷
    case 999:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break // 未知
    default:
      url = 'https://s2.ax1x.com/2019/07/30/eGmbbF.png'
      break
  }
  return url
}

// 计算某天是星期几
function getDayOfWeek(date: string | Date) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(date).getDay()]
}

// aqi 转为空气质量级别
function aqi2level(aqi: number | string) {
  if (aqi <= 50) {
    // 优
    return 1
  } else if (aqi <= 100) {
    // 良
    return 2
  } else if (aqi <= 150) {
    // 轻度污染
    return 3
  } else if (aqi <= 200) {
    // 中度污染
    return 4
  } else if (aqi <= 300) {
    // 重度污染
    return 5
  } else {
    //严重污染
    return 6
  }
}

export { dateFormat, array2object, getBackgroundByCode, getDayOfWeek, aqi2level }
