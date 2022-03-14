



// 处理大于1w的数字
export function handleNum(num) {
    if (num > 10000) {
        //toFixed方法可以把Number四舍五入为指定小数位数的数字
        num = (num / 10000).toFixed(1)
        return num + '万';
    } else {
        return num;
    }
}

export function hanleMusicTime(time){

    //如果超过了100000 基本就是毫秒为单位的了,先转换成秒
    time = parseInt(time)
    if(time > 10000){
        time = Math.floor(time/1000)
    }else{
        time = Math.floor(time)
    }

    let m = Math.floor(time/60)
    let s = Math.floor(time%60)
    m = m < 10?'0'+m:m
    s = s< 10?"0"+s:s
    return m+':'+s
}

// 将播放时长还原为秒数
export function returnSecond(time) {
    time = time.split(":")
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);
    return m * 60 + s;
}