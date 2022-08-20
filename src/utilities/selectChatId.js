export const selectChatId = (
  conversations,
  personId,
  setContactMessageIndex,
) => {
  const newcontactMessageIndex = conversations.reduce(
    (acc, element) => {
      if (element.id === personId) {
        return element.id;
      }
      return acc;
    },
    0,
  );
  setContactMessageIndex(newcontactMessageIndex);
};
