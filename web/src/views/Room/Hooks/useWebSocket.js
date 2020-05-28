import React, { useEffect, useRef, useState } from 'react';

export function useWebSocket(props = {}) {
  const { uid, socketURL, handleReceive } = props;

  const [connectTimes, setconnectTimes] = useState(0);
  const [isopen, setisopen] = useState(false);
  const messageCache = useRef([]);
  const ws = useRef();
  const heartbeatTimer = useRef();

  useEffect(() => {
    return () => {
      console.log('关闭socket');
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    // 心跳检查
    heartbeatTimer.current = setInterval(() => {
      if (!checkState('OPEN')) {
        reconnect();
      }
    }, 5000);
    return () => {
      console.log('关闭socket');
      heartbeatTimer.current = null;
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(socketURL);

    ws.current.onopen = () => {
      console.log('onopen');
      // 重连后，发送离线时的信息
      if (messageCache.current.length > 0) {
        for (const message of messageCache.current) {
          wsSend(message);
        }
      }
      setisopen(true);
    };
  }, [connectTimes]);

  useEffect(() => {
    if (isopen) {
      const receiveMessage = function(data) {
        data = JSON.parse(data);
        handleReceive(data);
      };

      ws.current.onmessage = event => {
        console.log('onmessage', event.data);
        receiveMessage(event.data);
      };
    }
  }, [isopen, handleReceive]);

  function wsSend(d) {
    ws.current.send(d);
  }

  function send(type = 'text', roomId, msg) {
    const sendData = JSON.stringify({ sender: uid, type: type, roomId: roomId, body: msg });
    if (checkState('OPEN')) {
      wsSend(sendData);
    } else {
      messageCache.current.push(sendData);
      reconnect();
    }
  }

  function reconnect() {
    console.log('reconnect');
    setconnectTimes(times => times + 1);
  }

  function checkState(state) {
    const stateCode = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
    };
    return ws.current.readyState === stateCode[state];
  }

  // console.log(ws.current);

  return {
    ws: ws.current,
    wsIsopen: isopen,
    wsSend: send,
  };
}
