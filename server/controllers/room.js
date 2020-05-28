const utils = require('../utils');
const roomData = require('../data/room');

const getDesc = async (ctx, next) => {
  let roomIds = ctx.request.body.roomIds;
  roomIds = roomIds.split(',');
  const list = [];
  for (const id of roomIds) {
    const data = await utils.find.findDataByKey(roomData.room, 'id', id);
    if (data) {
      list.push(data);
    }
  }
  ctx.response.body = utils.res.success(list);
};

module.exports = {
  'POST /room/getDesc': getDesc,
};
