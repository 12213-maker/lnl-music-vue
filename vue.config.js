module.exports = {
    devServer:{
        //配置不同的后台API地址
        proxy:{
            '/api':{
                target:'http://localhost:3000',//代理地址,这里设置的地址会替代axios中设置的baseURL
                changeOrigin: true,//开启代理,会在本地创建一个虚假服务器,然后发送请求的数据
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // chainWebpack: config=>{
    //     config.resolve.alias.set("@",resolve("src"));
    // }

    configureWebpack: {
        resolve: {
            //设置快捷
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'plugins': '@/plugins',
            }
        }
    },
}