import { api } from '@/config';

// api模块
const apiUrl = {};

api.modules.forEach((module) => {
  apiUrl[module] = `/${module}`;
});

export default apiUrl;
