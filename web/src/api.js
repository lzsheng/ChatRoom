import { request } from '@/utils/request';

export default {
  getUserInfo(uid) {
    return request({
      url: '/user/getInfo',
      method: 'post',
      loading: {
        show: true,
      },
      data: {
        uid: uid,
      },
    });
  },
  getRoomDesc(roomIds) {
    return request({
      url: '/room/getDesc',
      method: 'post',
      loading: {
        show: true,
      },
      data: {
        roomIds: roomIds,
      },
    });
  },
};
