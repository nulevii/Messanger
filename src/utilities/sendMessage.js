export const sendMessage = (message, contactId, setChat, id, isMyMessage, unread) => {
  const date = new Date();

  const messageDate = date.toLocaleDateString('en-US', {
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
  });

  const messageContainer = {
    id,
    messageText: message,
    createdAt: messageDate,
    isMyMessage,
  };
  const MessageHolder = JSON.parse(localStorage.getItem('conversations'));

  const newMessageHolder = MessageHolder.map((contact) => {
    if (contact.id === contactId) {
      contact.messages = [...contact.messages, messageContainer];
      contact.latestMessageText = message;
      contact.createdAt = messageDate;
      contact.unreadStatus = unread;
    }
    return contact;
  });

  const sortedContacts = newMessageHolder
    .map((obj) => ({ ...obj, createdAt: new Date(obj.createdAt) }))
    .sort((objA, objB) => Number(objB.createdAt) - Number(objA.createdAt))
    .map((obj) => ({
      ...obj,
      createdAt: `${new Date(obj.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })}`,
    }));
  localStorage.setItem('conversations', JSON.stringify(sortedContacts));
  const parseNewMessageHolder = JSON.parse(localStorage.getItem('conversations'));
  setChat(parseNewMessageHolder);
};
