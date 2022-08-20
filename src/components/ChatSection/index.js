import {
  BsFillArrowLeftCircleFill,

} from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import React, { useRef } from 'react';

import Chat from './Chat';
import SendMessageForm from './SendMessageForm';
import styles from './style.module.css';

function ChatSection(props) {
  const {
    setChangeSection,
    sendMessageProps,
    contactMessages: {
      userName, userImage, userImageAlt, messages,
    },
  } = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end',
    });
  };
  return (
    <>
      <header className={styles.header}>
        <figure className="user-img-figure">
          <img className="user-img" src={userImage} alt={userImageAlt} />
          <AiOutlineCheckCircle className="user-img-tick" />
        </figure>

        <div className={styles['name-and-last-message']}>
          <h4 className={styles['user-name']}>{userName}</h4>
        </div>

        <label className={styles['scroll-button-label']}>
          <BsFillArrowLeftCircleFill
            className={styles['scroll-button-immage']}
          />
          <button
            onClick={() => setChangeSection(false)}
            className={styles['scroll-button']}
            type="button"
          />
        </label>
      </header>
      <section className={styles['chat-section']}>
        <Chat
          messages={messages}
          userImage={userImage}
          userImageAlt={userImageAlt}
        />
        <div ref={messagesEndRef} />
      </section>
      <SendMessageForm
        scrollToBottom={scrollToBottom}
        sendMessageProps={sendMessageProps}
      />
    </>
  );
}

export default ChatSection;
