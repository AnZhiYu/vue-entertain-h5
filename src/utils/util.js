import { imgBaseUrl } from '@/config';
import moment from 'moment';
/**
 * 数字前补零
 *
 * @param {Number} number 数字
 * @returns {String} 补零后的数字
 */
export function prefixZero(number) {
  return `00${number}`.substr(number.length);
}

/**
 * 数字超过万位显示万
 *
 * @param {Number} number 数字
 * @returns {String} 补万后的数字
 */
export function formatTenThousand(number) {
  if (number >= 10000) {
    return `${(number / 10000).toFixed(1)}万`;
  }
  return number;
}

/**
 * 字符串替换
 *
 * @param {Number} String 替换的字符串
 * @returns {String} 需要替换成的
 * @returns {String} 需要替换成的目标
 */
export function replaceString(text = '', target = '', newTarget = '') {
  console.log(text, target, newTarget);
  const reg = new RegExp(target, 'gi');
  return text.replace(reg, newTarget);
}

/**
 * 格式化时间
 *
 * @export
 * @param {Number} time 时间戳（毫秒）
 * @param {String} [fmt='YYYY-MM-DD HH:mm:ss'] 时间格式
 * @returns {String} 格式化的时间
 */
export function formatTime(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(Number(time));
  let result;

  if (!time) {
    return '';
  }

  if (/(Y+)/.test(fmt)) {
    result = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
  }

  const obj = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  Object.keys(obj).forEach((key) => {
    if (new RegExp(`(${key})`).test(result)) {
      const value = String(obj[key]);
      result = result.replace(RegExp.$1, (RegExp.$1.length === 1) ? value : prefixZero(value));
    }
  });

  return result;
}

/**
 * 时间个位数前补零
 *
 * @param {Number} number 数字
 * @returns {String} 补零后的数字
 */
export function timerPrefixZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}
/**
 * 格式化数字(每隔n个数字按符号进行分割)
 *
 * @export
 * @param { Number } number 数字
 * @param { Number } [intervalNuml=3] 间隔值
 * @param { String } [delimiter=','] 分隔符
 * @returns { String } 格式化后的数字
 */
export function formatNumber(number, intervalNuml = 3, delimiter = ',') {
  if (!number) {
    return number;
  }
  const reg = new RegExp(`\\B(?=(\\d{${intervalNuml}})+(?!\\d))`, 'g');
  return String(number).replace(reg, delimiter);
}

// 格式化图片URL
export function formatImgUrl(path) {
  return `${imgBaseUrl}${path}`;
}

//
export function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 设置页面标题
 *
 * @export
 * @param {String} title 标题
 */
export function setTitle(title) {
  document.title = title || '微客宝';
}

/**
 * 获取Url参数值
 *
 * @export
 * @param {String} title 标题
 */
export function getUrlParamValue(name) {
  // eslint-disable-next-line prefer-template
  return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)')
    .exec(window.location.href) || [undefined, ''])[1]
    .replace(/\+/g, '%20')) || null;
}

export function getHashParamValue(name) {
  const { hash } = window.location;
  // eslint-disable-next-line prefer-template
  return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)')
    .exec(hash) || [undefined, ''])[1]
    .replace(/\+/g, '%20')) || null;
}

/**
 * 获取状态值
 *
 * @export
 * @param { String } key 状态key
 * @param { Array } statusList 状态列表
 * @returns { String } value 状态值
 */
export function getStatusValueByKey(key, statusList) {
  const status = statusList.find((item) => +item.key === +key);
  if (status) {
    return status.value;
  }
  return '';
}

/**
 * 获取状态类型
 *
 * @export
 * @param { String } key 状态key
 * @param { Array } statusList 状态列表
 * @returns { String } type 状态类型
 */
export function getStatusTypeByKey(key, statusList) {
  const status = statusList.find((item) => +item.key === +key);
  if (status) {
    return status.type;
  }
  return '';
}

/**
 * 防抖函数
 *
 * @export
 * @param {*} method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay) {
  let timer = null;
  return (...args) => {
    const self = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log('正在倒计时5');
      method.apply(self, args);
    }, delay);
  };
}

/**
 * 节流函数
 *
 * @export
 * @param method 事件触发的操作
 * @param delay 间隔多少毫秒需要触发一次事件
 */
export function throttle(method, delay, ...args) {
  let timer;
  let start;
  return function loop() {
    const self = this;
    const now = Date.now();
    if (!start) {
      start = now;
    }
    if (timer) {
      clearTimeout(timer);
    }
    if (now - start >= delay) {
      method.apply(self, args);
      start = now;
    } else {
      timer = setTimeout(() => {
        console.log('正在倒计时6');
        loop.apply(self, args);
      }, 50);
    }
  };
}
/**
 * base64转成bolb对象
 *
 * @export
 * @param base64Data base64数据
 */
export function dataURItoBlob(base64Data) {
  let byteString;
  if (base64Data.split(',')[0]
    .indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else byteString = unescape(base64Data.split(',')[1]);
  const mimeString = base64Data
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const ia = new Uint8Array(byteString.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

/**
 * base64转成File对象
 *
 * @export
 * @param dataurl base64数据
 * @param filename 处理后的文件明
 */
export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 压缩图片
 *
 * @export
 * @param img img元素dom
 */
export function compress(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // const initSize = img.src.length;
  const { width } = img;
  const { height } = img;
  canvas.width = width;
  canvas.height = height;
  // 铺底色
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height);
  // 进行最小压缩
  const ndata = canvas.toDataURL('image/png', 0.1);
  // console.log("*******压缩后的图片大小*******");
  return ndata;
}

/**
 * 链接转base64
 *
 * @export
 * @param url img链接
 */
function getBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas.toDataURL('image/png');
}

export function urlToBase64(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = '*';
    image.src = `${src}?v=${Math.random()}`;
    image.onload = function onload() {
      const base64 = getBase64Image(image);
      resolve(base64);
    };
    image.onerror = function onerror(err) {
      reject(err);
    };
  });
}

export function isIphone10() {
  const str = navigator.userAgent.toLowerCase();
  const ver = str.match(/cpu iphone os (.*?) like mac os/);
  const num = Number(ver[1].split('_')[0]);
  if (ver && Number(num) <= 10) {
    return true;
  }
  return false;
}

export function isIphone() {
  const str = navigator.userAgent.toLowerCase();
  const ver = str.match(/cpu iphone os (.*?) like mac os/);
  if (ver) {
    return true;
  }
  return false;
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag 是否任意长度 min 任意长度最小位[固定位数] max 任意长度最大位
*/

// eslint-disable-next-line import/prefer-default-export
export function randomWord(randomFlag, min, max) {
  let str = '';
  // eslint-disable-next-line no-undef
  let range = min;
  const arr = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (randomFlag) {
    // eslint-disable-next-line no-undef
    range = Math.round(Math.random() * (max - min)) + min;// 任意长度
  }
  let pos = '';
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-plusplus
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

export function isWeiXin() {
  let isWx;
  // wx 7.0.0 支持这样判断
  if (navigator.userAgent.includes('miniProgram')) {
    isWx = true;
  // ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
  } else if (!navigator.userAgent.includes('MicroMessenger')) {
    isWx = false; // 说明不在微信中
  } else {
    isWx = true;
  }
  return isWx;
}

export function isMini() {
  let isWxmini;
  // wx 7.0.0 支持这样判断
  // if (navigator.userAgent.includes('miniProgram')) {
  //   isWxmini = true;
  // // ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
  // } else if (!navigator.userAgent.includes('MicroMessenger')) {
  //   isWxmini = false; // 说明不在微信中
  // } else {
  //   isWxmini = false;
  //   wx.miniProgram.getEnv((res) => {
  //     isWxmini = !!res.miniprogram; // 没有驼峰！
  //   });
  // }
  if (navigator.userAgent.includes('miniProgram')) {
    isWxmini = true;
  // ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
  } else {
    isWxmini = false;
  }
  // eslint-disable-next-line no-underscore-dangle
  if (!isWxmini && window.__wxjs_environment === 'miniProgram') {
    isWxmini = true;
  }
  return isWxmini;
}

export function formatMoneyInt(money = '') {
  const filtMoney = money.split('.')[0] || '';
  return filtMoney;
}

export function formatMoneyDec(money = '') {
  const filtMoney = money.split('.')[1] || '';
  if (filtMoney) {
    return `.${filtMoney}`;
  }
  return '';
}

export function getCookie(name) {
  const cookies = document.cookie;
  const list = cookies.split('; '); // 解析出名/值对列表

  for (let i = 0; i < list.length; i += 1) {
    const arr = list[i].split('='); // 解析出名和值
    if (arr[0] === name) return decodeURIComponent(arr[1]); // 对cookie值解码
  }
  return '';
}

export function momentTime1(timestamp, showMin) {
  const date = new Date(timestamp * 1000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}.`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.`;
  const D = `${date.getDate()} `;
  const h = `${date.getHours()}:`;
  const m = `${date.getMinutes()}:`;
  const s = date.getSeconds();
  console.log(timestamp, timestamp * 1000, Y + M + D + h + m + s);
  if (showMin) {
    return Y + M + D + h + m + s;
  }
  return Y + M + D;
}

export function momentTime(data, showMin) {
  if (!data) {
    return '';
  }
  const date = new Date(data * 1000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if (showMin) {
    const value = moment(date).format('YYYY.MM.DD HH:mm:ss');
    return value;
  }
  return moment(date).format('YYYY-MM-DD');
}
