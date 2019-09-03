import axios from 'axios'
import {baseUrl} from '@/api/config/env'
import { Loading} from 'element-ui';

let loading = null;

// 创建axios实例
const service = axios.create({
    baseURL:baseUrl, //配置的开发环境和线上环境地址
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    //请求前到请求到数据这段时间用加载动画来代替，以服务方式调用
    loading=Loading.service(
        {
            fullscreen: true,
            text: '拼命加载中...',
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.8)"
        }
    );


    // Tip: 2 
    // 带上 token , 可以结合 vuex 或者重 localStorage
    // if (store.getters.token) {
    //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // } else {
    //     // 重定向到登录页面    
    // }

    return config
}, error => {
    // 请求错误时做些事(接口错误、超时等)

    // 关闭loadding
    loading.close();

    console.log('request:', error);
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 关闭loadding
        loading.close();

        return response;
    },
    error => {
        console.log('err' + error)// for debug

        // 关闭loadding
        loading.close();
        
        return Promise.reject(error)
    })

export default service
