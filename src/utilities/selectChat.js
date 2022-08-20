export const selectChat = (conversations, contactId) => {
  const selectedChat = conversations.find((conversation) => conversation.id === contactId);
  return {
    messages: selectedChat.messages,
    userName: selectedChat.title,
    userImage: selectedChat.imageUrl,
    userImageAlt: selectedChat.imageAlt,
  };
};
