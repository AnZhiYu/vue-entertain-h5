/* eslint-disable */
function initYsf() {
  (function(w, d, n, a, j) {
    w[n] =
      w[n] ||
      function() {
        (w[n].a = w[n].a || []).push(arguments);
      };
    j = d.createElement("script");      j.async = true;
    j.src =
      "https://qiyukf.com/script/bbb04a25332f010164f228078f17e5d5.js?hidden=1";

    var ua = navigator.userAgent.toLowerCase();
    var matchText = ua.match(/micromessenger/i);
    if (matchText && (matchText[0] === 'micromessenger')) {
      window.wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
          // 在小程序里
        } else {
          // 不在小程序里
          d.body.appendChild(j);
        }
      });
    } else {
      // 不在微信
      d.body.appendChild(j);
    }
  })(window, document, "ysf");
}

export default function loadYsf() {
  if (!window.ysf) {
    initYsf();
  }
}
