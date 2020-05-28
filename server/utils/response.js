/**
 * response模版配置
 */

const baseConfig = {};

const response = {
  success: function(data) {
    const base = {
      code: 200,
      msg: 'ok',
      data: data || null,
      time: new Date().getTime(),
    };
    return Object.assign({}, baseConfig, base);
  },
  error: function(code, msg, data) {
    const base = {
      code: code || 500,
      msg: msg || '服务器错误,请稍后重试',
      data: data || null,
      time: new Date().getTime(),
    };
    return Object.assign({}, baseConfig, base);
  },
  //response装饰器，添加try-catch
  decorator: function(fn) {
    return async function(ctx, next) {
      try {
        await fn(ctx, next);
      } catch (error) {
        console.log('decorator');
        console.error(error);
        ctx.response.body = response.error();
      }
    };
  },
};

module.exports = response;
