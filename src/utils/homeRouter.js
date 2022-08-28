const homeUrl = {
  // 'category/list': '/pages/goods/category/index',
  // 'item/list': '/pages/goods/search',
  // 'item/search': '/pages/goods/search',
  'item/info': '/goods/detail', // 带参数
  'order/list': '/order',
  'order/info': '/order/detail',
  // 'order/redBagSubject': '/pages/redpacket/goods/index',
  // 'cart/index': '/pages/cart/index',
  'user/index': '/user',
  // 'refund/list': '/pages/refund/list/index',
  // 'refund/info': '/pages/refund/detail/Index',
  'index/index': '/',
  'subject/info': '/showcase',
  // 'user/newZone': '/pages/subject/newzone/index',
  // 'bargain/index': '/pages/bargain/main/index',
  'groupon/index': '/groupon',
  // 'game/balloonIndex': '/pages/game/balloon/index',
  // 'bargain/info': '/pages/bargain/detail/index',
  // 'flashSale/index': '/pages/limitshop/index',
  // 'signIn/index': '/pages/taskCenter/index',
  'group/normal': '/groupon',
  'group/inviteNew': '/groupon',
  'bigBrand/index': '/bigbrandact',
  // 'redPackage/mall': '/pages/subject/redpacketMall/index',
  'makerCamp/articleInfo': '/maker/find/article',
  'makerCamp/activityInfo': '/maker/market/detail',
};

const minmUrl = {
  'category/list': '/pages/goods/category/index',
  'item/list': '/pages/goods/search',
  'item/search': '/pages/goods/search',
  'item/info': '/pages/goods/detail', // 带参数
  'order/list': '/pages/order/index',
  'order/info': '/pages/order/detail/index',
  'order/redBagSubject': '/pages/redpacket/goods/index',
  'cart/index': '/pages/cart/index',
  'user/index': '/pages/my/index',
  'refund/list': '/pages/refund/list/index',
  'refund/info': '/pages/refund/detail/index',
  'index/index': '/pages/home/index',
  'subject/info': '/pages/subject/index',
  'user/newZone': '/pages/subject/newzone/index',
  'bargain/index': '/pages/bargain/main/index',
  'groupon/index': '/pages/infinite/index',
  'game/balloonIndex': '/pages/game/balloon/index',
  'bargain/info': '/pages/bargain/detail/index',
  'flashSale/index': '/pages/limitshop/index',
  'signIn/index': '/pages/taskCenter/index',
  'group/normal': '/pages/homegroup/index',
  'group/inviteNew': '/pages/fightgroup/invite',
  'redPackage/mall': '/pages/subject/redpacketMall/index',
  'bigBrand/index': '/pages/bigBrand/index',
  'user/modifyInfo': '/pages/userInformation/index',
  'superFlashGroup/index': '/pages/fightgroup/index',
  'home/index': '/pages/home/index',
  'coupon/index': '/pages/coupon/index',
};

export const appUrl = {
  purchase: 'bluewhale://svip/purchase',
  item: 'bluewhale://item/info',
};

/**
 * 获取参数 a=dada&b=dada
 * @param {*} name
 * @param {*} url
 */
function getRouterName(name, url) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = url.match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 返回参数 原始original 跳转url 参数parame
 * @param {*} url 传递的url
 */
export function urlRouter(url = '', isMinm) {
  const router = {};
  if (!isMinm) {
    Object.keys(homeUrl).forEach((keyName) => {
      if (url.indexOf(keyName) !== -1) {
        router.original = url;
        router.url = homeUrl[keyName];
        const param = url.match(/\?(\S*)/);
        router.parame = param ? param[1] : '';
      }
    });
  } else {
    Object.keys(minmUrl).forEach((keyName) => {
      if (url.indexOf(keyName) !== -1) {
        router.original = url;
        router.url = minmUrl[keyName];
        const param = url.match(/\?(\S*)/);
        router.parame = param ? param[1] : '';
      }
    });
  }

  return router;
}

export function targetRouter(url = '', callback, isMinm) {
  // 跳转http
  const obj = urlRouter(url, isMinm);
  if (callback) {
    callback(obj);
    return false;
  }
  let tagUrl = '';
  if (obj.url === '/pages/goods/search') {
    obj.parame += (obj.parame ? '&issearch=1' : '?issearch=1');
  }
  if (obj.parame) {
    const categoryId = getRouterName('itemCategoryId', obj.parame);
    if (categoryId) {
      obj.parame = `${obj.parame}&categoryId=${categoryId}`;
    }
    tagUrl = `${obj.url}?${obj.parame}`;
  } else {
    tagUrl = obj.url;
  }
  console.log(tagUrl);
  return tagUrl;
}
