import Contacts from './Contacts';

import styles from './style.module.css';

function ContactsSection() {
  return (
    <section className={styles.contacts}>
      <h3 className={styles['contacts-header-text']}>Chats</h3>
      <Contacts />
    </section>
  );
}

export default ContactsSection;
