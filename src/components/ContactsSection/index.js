import Contacts from './Contacts';

import styles from './style.module.css';

function ContactsSection({
  contacts,
  setContactMessageIndex,
  setChangeSection,
}) {
  return (
    <section className={styles.contacts}>
      <h3 className={styles['contacts-header-text']}>Chats</h3>
      <Contacts
        contacts={contacts}
        setContactMessageIndex={setContactMessageIndex}
        setChangeSection={setChangeSection}
      />
    </section>
  );
}

export default ContactsSection;
