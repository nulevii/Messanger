import { AiOutlineSearch, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

import styles from './style.module.css';

function SearchSection(props) {
  const { findPerson, conversations, setChangeSection } = props;
  return (
    <section className={styles.section}>
      <div className={styles['img-and-button']}>
        <figure className="user-img-figure">
          <img
            className="user-img"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User"
          />
          <AiOutlineCheckCircle className="user-img-tick" />
        </figure>
        <label className={styles['scroll-button-label']}>
          <BsFillArrowRightCircleFill
            className={styles['scroll-button-immage']}
          />
          <button
            onClick={() => setChangeSection(true)}
            className={styles['scroll-button']}
            type="button"
          />
        </label>
      </div>
      <div className={styles['search-wrapper']}>
        <label htmlFor="contact-search" className={styles['search-label']}>
          <AiOutlineSearch className={styles['search-img']} />
        </label>

        <input
          onChange={(e) => {
            findPerson(conversations, e.target.value);
          }}
          className={styles['search-input']}
          type="search"
          placeholder="Search or start new chat"
          name="contact-search"
          id="contact-search"
        />
      </div>
    </section>
  );
}

export default SearchSection;
