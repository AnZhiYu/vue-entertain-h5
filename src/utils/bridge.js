import { versions } from '@/utils/browser';

export default {
  callhandler(name, data, callback) {
    let result = '';
    if (versions.android) {
      if (data) {
        // 这是android提前与安卓开发人员协商好
        result = window.JDL[name](data);
      } else {
        result = window.JDL[name]();
      }
    }
    if (versions.iosApp) {
      result = window.webkit.messageHandlers[name].postMessage(data);
    }
    // 这里考虑到可能有的api有返回值,所以返回了个result
    if (callback) {
      callback(result);
    }
  },
};
