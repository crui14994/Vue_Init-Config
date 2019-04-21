import axios from 'axios'
// import { Message } from 'element-ui'
//sotre
import store from "./../store/index";

import qs from 'qs' // 序列化请求数据，视服务端的要求

// 创建axios实例
const service = axios.create({
    //这里baseurl就是刚开始配置的开发环境和线上环境地址，webpack会自动读取无需手动再改
    baseURL: process.env.BASE_URL, //baseurl
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Tip: 1
    // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
    
    // Tip: 2 
    // 带上 token , 可以结合 vuex 或者重 localStorage
    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // } else {
    //     // 重定向到登录页面    
    // }

    // Tip: 3
    // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method.toLocaleLowerCase() === 'post'
        || config.method.toLocaleLowerCase() === 'put'
        || config.method.toLocaleLowerCase() === 'delete') {

        config.data = qs.stringify(config.data)
    }
    return config
}, error => {
    // 请求错误时做些事(接口错误、超时等)
    // Tip: 4
    // 关闭loadding

    console.log('request:', error);
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
})

// respone拦截器
service.interceptors.response.use(
    response => response,
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
    error => {
        console.log('err' + error)// for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    })

export default service
