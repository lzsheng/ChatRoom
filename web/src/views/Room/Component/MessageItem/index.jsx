import React from "react";
import cls from "classnames";
import styles from "./style.scss";

const baseConfig = {
  isMyself: true,
  avatarUrl: "/demo/img_avatar.jpeg",
  content: "吃爱丽丝肯德基发啦吗",
};

function MessageItem(props) {
  const { avatarUrl, content, isMyself } = { ...baseConfig, ...props };

  return (
    <div
      className={cls({
        [styles.box]: true,
        [styles.isMyself]: isMyself,
      })}
    >
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${avatarUrl})`,
        }}
      ></div>
      <div className={styles.content}>
        <p className={styles.contentText}>{content}</p>
      </div>
    </div>
  );
}

export default MessageItem;
