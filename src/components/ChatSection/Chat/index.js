import styles from './style.module.css';

function Chat({ userImage, userImageAlt, messages }) {
  return (
    <>
      {messages.map(({
        messageText, isMyMessage, createdAt, id,
      }) => {
        if (isMyMessage) {
          return (
            <article key={id} className={styles['my-message-layout']}>
              <div className={styles['message-wrapper']}>
                <p className={styles['message-text']}>{messageText}</p>
              </div>
              <p className={styles['message-send-time']}>{createdAt}</p>
            </article>
          );
        }
        return (
          <article key={id} className={styles['message-layout']}>
            <div className={styles['message-wrapper']}>
              <figure
                className={`user-img-figure ${styles['user-img-figure']}`}
              >
                <img
                  className={`user-img ${styles['user-img']}`}
                  src={userImage}
                  alt={userImageAlt}
                />
              </figure>

              <p className={styles['message-text']}>{messageText}</p>
            </div>
            <p className={styles['message-send-time']}>{createdAt}</p>
          </article>
        );
      })}
      <div style={{ marginTop: '100px' }} />
    </>
  );
}

export default Chat;
