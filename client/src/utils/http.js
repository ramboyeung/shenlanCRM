import axios from "axios";
import { Loading, Message } from 'element-ui';
import router from "@/router";

let loading;
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    spinner: "el-icon-loading",
    background: "rgba(0,0,0,0.8)"
  });
}

function endLoading () {
  loading.close();
}

/*
//var instance = axios.create({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });
const instance = axios.create({
  // 接口地址的base_url
  baseURL: "http://localhost:3000",
  // 请求超时时间
  timeout: 10000,
  withCredentials: false,
  headers: {
	  Accept: "application/json",
	  "Content-Type": "application/jason"
  }
});

// request拦截器
instance.interceptors.request.use(
  config => {
    // 发送请求之前可修改配置
    return config;
  },
  error => {
    // 处理错误
    return Promise.reject(error);
  }
);

// respone拦截器
instance.interceptors.response.use(
  response => {
    //修改返回数据
    return response;
  },
  error => {
    // 处理错误
    return Promise.reject(error);
  }
);
export default instance;

*/
axios.defaults.timeout = 5000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = 'http://localhost:5000/api';   //配置接口地址

//请求拦截
axios.interceptors.request.use(config => {
  //开始加载动画
  startLoading();
  const token = sessionStorage.getItem("eleToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use((response) => {
  //结束加载动画
  endLoading();
  return response;
}, error => {
  //错误提醒
  endLoading();
  if (error.response && error.response.data) {
    Message.error(error.response.data);

    //判断token是否过期（401表示token失效）,失效的话需要重新跳转到登录页并清除之前的token
    const { status } = error.response;
    if (status == 401) {
      Message.error("token失效，请重新登录！");
      sessionStorage.removeItem("eleToken");
      router.push("/login");
    }

  }

  return Promise.reject(error);
});

export default axios;