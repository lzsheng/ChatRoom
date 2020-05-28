const utils = require('../utils');
const userData = require('../data/user');

const getInfo = async (ctx, next) => {
  const uid = ctx.request.body.uid;
  const data = await utils.find.findDataByKey(userData.userInfo, 'id', uid);
  ctx.response.body = utils.res.success(data);
};

module.exports = {
  'POST /user/getInfo': getInfo,
};
