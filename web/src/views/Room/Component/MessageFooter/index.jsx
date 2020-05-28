import React, { useState } from 'react';
import { Button } from 'antd-mobile';
import styles from './style.scss';

function MessageInput(props) {
  const { sendCallback, sendDisabled } = props;
  const [val, setval] = useState('');
  function handleClick() {
    setval('');
    sendCallback(val);
  }

  return (
    <footer className={styles.messageFooter}>
      <input
        className={styles.input}
        value={val}
        onChange={e => {
          setval(e.target.value);
        }}
      ></input>
      <Button className={styles.btn} type="primary" disabled={sendDisabled} onClick={handleClick}>
        发送
      </Button>
    </footer>
  );
}

export default MessageInput;
