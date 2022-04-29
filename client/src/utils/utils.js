//导出方式一：class类的方式导出，引入时有两种使用方式：类名.xx()或导出放在vue原型上，使用时直接this.xx()，注意如果是放vue原型上了，如果是路由上使用就不行了
// export default class Utils {
//   static a = () => { }
//   static b = () => { }
// }

//引入方式：import Utils from "../utils.js"

//导出方式二：分别定义多个函数，再导出一个对象（注意是export {a,b,c}）,使用时引入即可（注意是import { isEmpty } from "xx"）
// const transUTCTimestamp = () => { };
// const isEmpty = () => { };
// export { transUTCTimestamp, isEmpty };//或者多次地export function A(){}、export function B(){}、……
/** 这种导出方式，对应地，可使用两种方式引入：
  * 部分引入：import { transUTCTimestamp } from "./utils.js"
  * 或者全部引入：import * as Utils from "./utils.js";
*/

//格式化UTC时间
const transUTCTimestamp = (datetime, dateSeprator = '-', timeSeprator = ':') => {
  if (datetime) {
    const date = new Date(datetime);
    const isUtcTime = (date.toString().indexOf("T") === -1);//等于-1表示没查到，说明不是UTC 时间
    const year = `${date.getUTCFullYear()}`;
    let month = `${date.getUTCMonth() + 1}`;
    let day = `${date.getUTCDate()}`;
    let hour = isUtcTime ? `${date.getUTCHours()}` : `${Number(date.getUTCHours()) + 8}`;//换算为北京时间
    let minute = `${date.getUTCMinutes()}`
    let second = `${date.getUTCSeconds()}`

    if (month.length === 1) {
      month = `0${month}`
    }
    if (day.length === 1) {
      day = `0${day}`
    }
    if (day.length === 1) {
      day = `0${day}`
    }
    if (hour.length === 1) {
      hour = `0${hour}`
    }
    if (minute.length === 1) {
      minute = `0${minute}`
    }
    if (second.length === 1) {
      second = `0${second}`
    }
    return `${year}${dateSeprator}${month}${dateSeprator}${day} ${hour}${timeSeprator}${minute}${timeSeprator}${second}`
  }
};

// 格式化时间: =>  xxxx年xx月xx日
const formatTime = (now) => {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? '0' + date : date;
  let time = year + '-' + month + '-' + date;
  return time;//xxxx年xx月xx日
};

// 格式化当前日期： =>  xxxx年xx月xx日 星期x
const todayDate = () => {
  let dt, y, m, d, w
  dt = new Date()
  y = dt.getFullYear()
  m = dt.getMonth() + 1
  d = dt.getDate()
  w = dt.getDay()
  let weeks = ['天', '一', '二', '三', '四', '五', '六']
  return `${y} 年 ${m.toString().padStart(2, '0')} 月 ${d.toString().padStart(2, '0')} 日  星期${weeks[w]}`
};

//判断某数据是否为空
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

// 判断浏览器是否全屏
const fullScreen = () => {
  let isFull = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
  if (isFull) {
    let close = document.exitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen;
    close && close.call(document);
  } else {
    let docElm = document.documentElement;
    let open = docElm.requestFullScreen || docElm.webkitRequestFullScreen || docElm.mozRequestFullScreen || docElm.msRequestFullscreen;
    open && open.call(docElm);
  }
};



// 参数格式化并编码
//在实践中更常见的是对查询字符串参数而不是对基础URL进行编码，encodeURIComponent识别空格、换行等空字符
const urlEncode = (param, key, encode) => {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    if (param.toString() != "") paramStr += "&" + key + "=" + (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;//返回像"id=1&name=lisi"的已经编码了的字符串，注意后端使用需要解码
};

export { transUTCTimestamp, formatTime, todayDate, isEmpty, fullScreen, urlEncode }
