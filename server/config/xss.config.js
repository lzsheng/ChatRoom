const xss = require('xss')
/**
 * xss: 配置文件
 * https://github.com/leizongmin/js-xss
 */
module.exports = function () {
    return async (ctx, next) => {
        const reqBody = ctx.request.body
        const xssOptions = {
            whiteList: {
                a: ['href', 'title', 'target']
            }
        }
        if (reqBody) {
            for (const key in reqBody) {
                if (reqBody.hasOwnProperty(key)) {
                    const e = reqBody[key];
                    // console.log(e)
                    reqBody[key] = xss(e)
                    // console.log(reqBody[key])
                }
            }
        }
        await next()
    }
}
