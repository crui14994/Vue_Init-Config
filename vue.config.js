// vue.config.js
const path =  require('path'); //引入path模块（node）
const resolve = (dir) => path.join(__dirname, dir); //将文件组成绝对路径
 
module.exports = {
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('@', resolve('src'))
          .set('assets', resolve('src/assets'))
          .set('components', resolve('src/components'))
    }
}
