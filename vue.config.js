module.exports = {
    devServer:{
        //配置不同的后台API地址
        proxy:{

            /* 下面只是开发环境dev中解决了跨域 , 
            真正部署到服务器上如果是非同源还是存在跨域问题 */
            '/api':{
                target:'http://localhost:3000',//代理地址,这里设置的地址会替代axios中设置的baseURL
                changeOrigin: true,//开启代理,会在本地创建一个虚假服务器,然后发送请求的数据 , 实现跨域
                pathRewrite: {
                    '^/api': ''//这里用'/api'代替target里面的地址 , 后面想要调用'http://localhost:3000'的时候直接'/api
                }
            }
        }
    },

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