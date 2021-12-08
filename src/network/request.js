import axios from 'axios'

//使用的请求都是get请求
export function request(url,params){
    const instance = axios.create({
        baseURL:'/api',
        timeout:30000,
        withCredentials:true,//表示跨域请求时是否需要使用凭证
    })
    
    
    instance.defaults.withCredentials = true
    
    //如果有参数
    if(params){
        return instance.get(url,params)
    }else{
        return instance.get(url)
    }
}