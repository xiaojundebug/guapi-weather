import { useCallback } from '@tarojs/taro'

function useThrottle(fn: Function, delay: number, cb?: Function) {
  let time: number
  return useCallback((...args) => {
    const curTime = new Date().getTime()
    if (time && curTime - time < delay) {
      return cb && cb()
    }
    time = curTime
    fn.call(this, ...args)
  }, [])
}

export { useThrottle }
