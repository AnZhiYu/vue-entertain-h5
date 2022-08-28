/* eslint-disable no-else-return */
import { storage } from '@/config';

const { namespace = '' } = storage;

function setItem(name, value, expire) {
  if (!name || (typeof name !== 'string' && typeof name !== 'number')) {
    throw new Error(`${name}必须为合法的字符串或数字`);
  }
  const data = {
    value,
    expire: expire ? Date.now() + expire : null,
  };
  localStorage.setItem(`${namespace}${name}`, JSON.stringify(data));
}

function getItem(name) {
  let result = localStorage.getItem(`${namespace}${name}`);
  if (result) {
    result = JSON.parse(result);
    const { value, expire } = result;
    if (expire && Date.now() >= expire) {
      return null;
    } else if (value) {
      return result.value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function removeItem(name) {
  localStorage.removeItem(`${namespace}${name}`);
}

export default {
  setItem,
  getItem,
  removeItem,
};
