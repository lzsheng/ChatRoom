import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styles from './style.scss';

const baseConfig = {
  nickName: '小明',
  avatarUrl: '/demo/img_avatar.jpeg',
  content: '今天回家吃饭吗？今天回家吃饭吗？今天回家吃饭吗？今天回家吃饭吗？今天回家吃饭吗？',
  time: +new Date(),
};

function ListItem(props) {
  const { nickName, avatarUrl, content, time } = { ...baseConfig, ...props };

  const lastTime = useMemo(() => {
    return `${dayjs(time).hour()}:${dayjs(time).minute()}`;
  }, [time]);

  return (
    <div className={styles.box}>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${avatarUrl})`,
        }}
      ></div>
      <div className={styles.content}>
        <div className={styles.nickName}>{nickName}</div>
        <div className={styles.ellipsis}>{content}</div>
      </div>
      <div className={styles.status}>
        <div>{lastTime}</div>
        <div></div>
      </div>
    </div>
  );
}

export default ListItem;
