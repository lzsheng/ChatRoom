/**
 * koa2-cors: CORS跨域配置
 */
module.exports = {
    origin: function (ctx) {
        return ctx.get('Origin');//什么origin来请求都允许，等于 "* 号
        // return "*"
    },
    exposeHeaders: ['Cache-Control', 'Content-Language','Content-Type','Expires','Last-Modified','Pragma'],
    // maxAge: 5,
    credentials: true,
    allowMethods: ['POST','GET','OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','X-Requested-With'],
}
