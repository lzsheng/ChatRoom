import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '@/api';
import { useWebSocket } from './Hooks/useWebSocket';
import MessageItem from './Component/MessageItem';
import MessageFooter from './Component/MessageFooter';
import styles from './style.scss';

function Room() {
  const { roomId, uid } = useParams();
  const [roomInfo, setroomInfo] = useState();
  const [forceUpdate, setForceUpdate] = useState(-9999999);
  const listData = useRef([]);

  const receiveMessage = function(data) {
    if (data.roomId === roomId) {
      listData.current = [...listData.current, data];
      setForceUpdate(t => t + 1);
    }
  };
  const { ws, wsIsopen, wsSend } = useWebSocket({
    uid: uid,
    socketURL: `ws://${window.location.hostname}:3389/?uid=${uid}&roomId=${roomId}`,
    handleReceive: receiveMessage,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await Api.getRoomDesc(roomId);
      setroomInfo(data);
    }
    fetchData();
    return () => {};
  }, []);

  function sendCallback(msg) {
    console.log(msg);
    wsSend('text', roomId, msg);
  }

  return (
    <div className={styles.box}>
      <nav className={styles.nav}>聊天室-{roomId}</nav>
      <div className={styles.body}>
        {listData.current.length > 0 &&
          listData.current.map((messageData, idx) => {
            return (
              <MessageItem
                key={idx}
                isMyself={messageData.sender === uid}
                content={messageData.body}
              />
            );
          })}
        {/* <MessageItem />
        <MessageItem isMyself={false} />
        <MessageItem content="离开时间啊杰弗里斯开了房JSLKFJLSKF JALFKASKLFlks jdflksjfl k老是解放路口附近" /> */}
      </div>
      <MessageFooter sendCallback={sendCallback} sendDisabled={!wsIsopen} />
    </div>
  );
}

export default Room;
