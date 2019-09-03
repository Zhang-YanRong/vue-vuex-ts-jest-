import axios from 'axios'
const axiosConfig: any = {
    axios: null
};

// axios 配置
axiosConfig.axios = axios.create({
    //     baseURL: 'http://192.168.35.246:9527',
    //     timeout: 1000,
});


// http request 拦截器
axiosConfig.axios.interceptors.request.use(
    (config: any) => {

        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }
        return config;
    }, (err: any) => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axiosConfig.axios.interceptors.response.use(
    (response: any) => {
        return response
    }, (error: any) => { // 这里是返回状态码不为200时候的错误处理
        // 对响应错误做点什么
        return Promise.reject(error)
    }
);

export default axiosConfig.axios