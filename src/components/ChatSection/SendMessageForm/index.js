import React, { useContext, useRef } from 'react';

import { MdOutlineSend } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import uniqid from 'uniqid';

import { Context } from '../../../Context';
import styles from './style.module.css';
import { sendMessage } from '../../../utilities/sendMessage';
import { getMessage } from '../../../utilities/getMessage';

function SendMessageForm({ scrollToBottom }) {
  const { sendMessageProps: { contactId, setChat } } = useContext(Context);
  const messageRef = useRef(null);

  const sendAnsver = () => {
    getMessage('https://api.chucknorris.io/jokes/random').then((result) => {
      setTimeout(() => {
        sendMessage(result, contactId, setChat, uniqid(), false, true);
        scrollToBottom();
      }, 3000);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const messageValue = messageRef.current.value;
    sendMessage(messageValue, contactId, setChat, uniqid(), true, false);
    messageRef.current.value = '';
    scrollToBottom();
    sendAnsver();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={styles['message-form']}
      action="send"
    >
      <label
        htmlFor="message-input"
        className={styles['message-inputs-wrapper']}
      >
        <TextareaAutosize
          ref={messageRef}
          className={styles['message-input']}
          type="text"
          name="message-input"
          id="message-input"
          onKeyPress={(e) => {
            if (e.code === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <label className={styles['send-button-label']} htmlFor="send-button">
          <button
            id="send-button"
            className={styles['send-button']}
            type="submit"
          />
          <MdOutlineSend className={styles['send-button-img']} />
        </label>
      </label>
    </form>
  );
}

export default SendMessageForm;
