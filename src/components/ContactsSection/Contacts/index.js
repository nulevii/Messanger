import { AiOutlineCheckCircle, AiFillMessage } from 'react-icons/ai';
import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../../../Context';
import styles from './style.module.css';
import { selectChatId } from '../../../utilities/selectChatId';

function Contacts() {
  const { contacts, setContactMessageIndex, setChangeSection } = useContext(Context);

  const initialSelect = () => contacts.find((contact) => contact).id;

  const [selectedChat, setSelectedChat] = useState('0');
  useEffect(() => {
    setSelectedChat(initialSelect());
  }, []);
  return contacts.map((contact) => {
    const {
      id,
      imageUrl,
      imageAlt,
      title,
      createdAt,
      latestMessageText,
      unreadStatus,
    } = contact;
    return (
      <article
        tabIndex="0"
        key={id}
        onClick={() => {
          const changeUnreadStatus = () => {
            if (unreadStatus === true) {
              contact.unreadStatus = false;
              localStorage.setItem('conversations', JSON.stringify(contacts));
            }
          };
          changeUnreadStatus();
          selectChatId(contacts, id, setContactMessageIndex);
          setChangeSection(true);
          setSelectedChat(id);
        }}
        onKeyDown={(e) => e.key === 'Enter'
          && (selectChatId(contacts, id, setContactMessageIndex),
          setSelectedChat(id))}
        className={`${styles['user-info']} ${
          selectedChat.includes(id) ? 'selected' : ''
        }`}
      >
        <figure className="user-img-figure">
          <img className="user-img" src={imageUrl} alt={imageAlt} />
          {unreadStatus ? (
            <AiFillMessage className="user-img-tick" />
          ) : (
            <AiOutlineCheckCircle className="user-img-tick" />
          )}
        </figure>

        <div className={styles['name-and-last-message']}>
          <h4 className={styles['user-name']}>{title}</h4>
          <p className={styles['last-message']}>
            {latestMessageText.length >= 50
              ? `${latestMessageText.substring(0, 50)}...`
              : latestMessageText}
          </p>
        </div>

        <div className={styles['last-message-date-container']}>
          <p className={styles['last-message-date']}>{createdAt}</p>
        </div>
      </article>
    );
  });
}

export default Contacts;
