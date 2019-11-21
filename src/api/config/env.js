let baseUrl = '';

const env = process.env
if (env.NODE_ENV == 'development') {
    baseUrl = `http://localhost:3000`; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = `https://api.xxxxxx.cn`; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = `https://api.xxxxxx.cn`; //测试环境地址
}

export {
    baseUrl,
    env
}
