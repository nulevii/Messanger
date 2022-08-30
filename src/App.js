import React, { useState, useEffect, useMemo } from 'react';

import { Context } from './Context';
import SearchSection from './components/SearchSection';
import ContactsSection from './components/ContactsSection';
import ChatSections from './components/ChatSection';

import conversations from './utilities/contacts';

import { loadLocalStorage } from './utilities/loadLocalStorage';
import { selectChat } from './utilities/selectChat';

function App() {
  const localStorageConversations = loadLocalStorage('conversations', conversations);
  const [contacts, setContacts] = useState(localStorageConversations);
  const [contactId, setContactMessageIndex] = useState('1');
  const [changeSection, setChangeSection] = useState(false);

  const initialSelect = () => contacts.find((contact) => contact).id;
  useEffect(() => {
    setContactMessageIndex(initialSelect());
  }, []);
  const selectedChat = selectChat(localStorageConversations, contactId);

  const findPerson = (conversations, requiredContact) => {
    const searchFilter = new RegExp(`${requiredContact}`, 'i');
    const newContacts = conversations.filter(({ title }) => title.match(searchFilter));
    setContacts(newContacts);
  };

  const contextData = useMemo(
    () => ({
      contacts,
      setContactMessageIndex,
      setChangeSection,

      sendMessageProps: {
        contactId,
        setChat: setContacts,
      },
    }),
    [contacts, contactId],
  );

  return (
    <Context.Provider value={contextData}>
      <main className="main">
        <section className="contacts-section ">
          <SearchSection
            conversations={localStorageConversations}
            findPerson={findPerson}
            setChangeSection={setChangeSection}
          />
          <ContactsSection />
        </section>
        <section
          className={`chat-section ${
            changeSection ? 'contacts-section-hide' : ''
          }`}
        >
          <ChatSections
            contactMessages={selectedChat}
            setChangeSection={setChangeSection}
          />
        </section>
      </main>
    </Context.Provider>
  );
}

export default App;
