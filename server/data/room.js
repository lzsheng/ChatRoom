const room = [
  {
    id: 'ask1',
    type: '0', // 0-普通聊天室 1-群聊
    name: 'APP切图仔1',
    uids: ['uid_1', 'uid_2'],
  },
  {
    id: 'ask2',
    type: '0', // 0-普通聊天室 1-群聊
    name: 'APP切图仔2',
    uids: ['uid_1', 'uid_3'],
  },
  {
    id: 'ask3',
    type: '1', // 0-普通聊天室 1-群聊
    name: '前端小分队',
    uids: ['uid_1', 'uid_2', 'uid_3'],
  },
]

module.exports = {
  room: room,
};
