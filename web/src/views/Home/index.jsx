import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getQueryVariable } from '@/utils';
import ListItem from './Component/ListItem';
import styles from './style.scss';
import Api from '@/api';

/*
http://localhost:3000/home?uid=uid_1
http://localhost:3000/home?uid=uid_2
http://localhost:3000/home?uid=uid_2
*/

function Home() {
  const uid = getQueryVariable('uid');

  const [userInfo, setuserInfo] = useState();
  const [roomInfo, setroomInfo] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data: userInfo } = await Api.getUserInfo(uid);
      console.log('userInfo', userInfo);
      const { data: roomInfo } = await Api.getRoomDesc(userInfo.roomIds);
      setuserInfo(userInfo);
      setroomInfo(roomInfo);
    }
    fetchData();
    return () => {};
  }, []);
  return (
    <div className={styles.box}>
      {userInfo &&
        roomInfo &&
        roomInfo.map((item, idx) => (
          <Link key={idx} to={`/room/${item.id}/${userInfo.id}`}>
            <ListItem nickName={item.name} />
          </Link>
        ))}
    </div>
  );
}

export default Home;
