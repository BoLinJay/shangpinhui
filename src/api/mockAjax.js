// axios二次封装
import axios from 'axios'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests = axios.create({
        baseURL:'/mock',
        timeout:5000
})
// 添加一个请求拦截器
requests.interceptors.request.use(function (config) {
    //在发送请求之前做些什么
    nprogress.start();
    return config;
  }, function (error) {
    // 处理请求错误
    return Promise.reject(error);
  });

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 任何位于2xx范围内的状态码都会触发此函数
    // 对响应数据做些什么
    nprogress.done();
    return response.data;
  }, function (error) {
    // 任何不在2xx范围内的状态码都会触发此函数
    // 处理响应错误
    return Promise.reject(error);
  });
//  暴露
export default requests;
