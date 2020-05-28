/**
 * 向node全局变量process中添加属性
 */
module.exports = function () {
    //需要添加的属性
    const set_process = {
        serviceName: 'api'
    }
    //向node全局变量process中添加属性
    for (let key in set_process) {
        console.log(`===开始修改process===`)
        if (set_process.hasOwnProperty(key)) {
            process[key] && console.warn(`process中已经存在${key}`)
            let element = set_process[key]
            process[key] = element
            console.log(`向process对象中添加( ${key} )`)
        }
        console.log(`===结束修改process===`)
    }
}