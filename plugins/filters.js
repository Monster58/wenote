import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
/**
 * 时间格式化
 * @param date {Date} 时间对象
 * @return {String}
 */
export const dateFormat = date => dayjs().to(date)