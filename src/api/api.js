import axios from 'axios'
import qs from "qs";

// axios 配置
const instance = axios.create({
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'development' ? "/api" : "",
})

//拦截重复请求
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removeRepeatUrl = (config) => {
  let comValue = config.method === 'get' ? qs.stringify(config.params) : qs.stringify(config.data, {
    arrayFormat: 'comma'
  });
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method + '&' + comValue) { //当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}
let saveRepeatUrl = (config) => {
  let comValue = config.method === 'get' ? qs.stringify(config.params) : qs.stringify(config.data);
  config.cancelToken = new cancelToken((c) => {
    pending.push({
      u: config.url + '&' + config.method + '&' + comValue,
      f: c
    }); // 自定义唯一标识
  });
}


// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么，比如传token
  removeRepeatUrl(config); //在一个ajax发送前执行一下取消操作
  saveRepeatUrl(config); //保存请求地址
  return config
}, error => {
  // 对请求错误做些什么
  // console.log(error) // for debug
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  removeRepeatUrl(response.config); //执行取消操作，把已经完成的请求从pending中移除
  // 对响应数据做点什么 
  const {
    status
  } = response.data;
  //对错误代码做处理
  if (status !== 'success') {
    console.log(response.data);
    return {
      data: [],
      msg: response.data.msg
    };
  }
  return response.data;
}, error => {
  // 对响应错误做点什么
  // console.log('err' + error) // for debug
  return Promise.reject(error);
});

export default instance;


/**
 * 封装所有请求
 * @param method
 * @param url
 * @param data 
 * @param headers
 * @returns {Promise}
 */
export function request(method, url, data = {}, headers) {
  return new Promise((resolve, reject) => {
    instance({
        method: method || 'post',
        url: url,
        params: method === 'get' ? data : {},
        data: method !== 'get' ? data : {},
        headers: headers,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}