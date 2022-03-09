//对于axios进行二次封装
import axios from 'axios'

//使用的请求都是get请求
export function request(url,params){
    const instance = axios.create({
        baseURL:'/api',
        timeout:30000,
        withCredentials:true,//表示跨域请求时是否需要使用凭证
    })

    //请求拦截器
    axios.interceptors.request.use(
        //在发送之前做点什么
        (config)=>{
            return config
        },
        //在请求错误之前做点什么
        (error)=>{
            console.log(error);
        },
    )

    //响应拦截器
    axios.interceptors.response.use(
        //对响应数据做点什么
        (response)=>{
            return response
        },
        //对响应错误做点什么
        (error)=>{
            console.log(error);
            if(error.response.data.msg=='需要登录'){
                this.$store.commit("updataLoginState", true);
            } else {
                console.log(err.response.data.msg);
            }
        },
    )

    
    instance.defaults.withCredentials = true//这步是干什么的我搞忘记了
    
    //如果有参数
    if(params){
        return instance.get(url,params)
    }else{
        return instance.get(url)
    }
}