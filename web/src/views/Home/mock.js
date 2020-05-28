const userInfo = [
  {
    id: "uid_1",
    nickName: "前端切图仔",
    sex: "1", // 0- 未知 ，1-男 ,2-女
    age: "28",
    roomList: [
      {
        id: "ask1",
        type: "0", // 0-普通聊天室 1-群聊
        name: "APP切图仔1",
        memberIds: ["uid_1", "uid_2"],
      },
      {
        id: "ask2",
        type: "0", // 0-普通聊天室 1-群聊
        name: "APP切图仔2",
        memberIds: ["uid_1", "uid_3"],
      },
      {
        id: "ask3",
        type: "0", // 0-普通聊天室 1-群聊
        name: "APP切图仔3",
        memberIds: ["uid_1", "uid_4"],
      },
      {
        id: "ask4",
        type: "0", // 0-普通聊天室 1-群聊
        name: "APP切图仔4",
        memberIds: ["uid_1", "uid_5"],
      },
    ],
  },
  {
    id: "uid_2",
    nickName: "APP切图仔1",
    sex: "1", // 0- 未知 ，1-男 ,2-女
    age: "27",
    roomList: [
      {
        id: "ask1",
        type: "0", // 0-普通聊天室 1-群聊
        name: "前端切图仔",
        memberIds: ["uid_1", "uid_2"],
      },
    ],
  },
];

export const getUserInfo = function (id) {
  let res;
  for (const user of userInfo) {
    if (user.id === id) {
      res = user;
      break;
    }
  }
  return res;
};
