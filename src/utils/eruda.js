export default function initEruda() {
  const script = document.createElement('script');
  script.src = 'https://cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.js';
  script.defer = true;
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function init() {
    window.eruda.init();
  };
}
