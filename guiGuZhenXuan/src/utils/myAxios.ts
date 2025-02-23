import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
const myAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

//请求拦截器
myAxios.interceptors.request.use((config) => {
  // config 有请求头属性headers，用于给服务器端传递公共参数
  const userStore = useUserStore();
  if (userStore.token) config.headers.token = userStore.token;
  return config;
});

// 响应拦截器
myAxios.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data;
  },
  (error) => {
    // 失败回调
    // msg存储网络错误信息
    let message = "";
    // http状态码
    const status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default myAxios;
