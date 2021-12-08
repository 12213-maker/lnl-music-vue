module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin: true,//开启代理,会在本地创建一个虚假服务器,然后发送请求的数据
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}