import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import { useEffect, useState } from 'react';

import styles from './style.module.css';

function SearchSection(props) {
  const { findPerson, conversations, setChangeSection } = props;

  const [userInfo, setUserInfo] = useState({});

  const userImg = userInfo.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const userName = userInfo.name || '';
  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    // localStorage.setItem('userObject', userObject);
    setUserInfo(userObject);
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize(
      {
        client_id:
          '423488661964-ln5nhcimsgdatc68sh13ihd1s861hata.apps.googleusercontent.com',
        callback: handleCallbackResponse,
      },
      [],
    );
    // google.accounts.id.renderButton()
    google.accounts.id.prompt();
    console.log('heool');
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles['img-and-button']}>
        <figure className="user-img-figure">
          <img className="user-img" src={userImg} alt="User" />
          <AiOutlineCheckCircle className="user-img-tick" />
        </figure>

        <div>
          {userName}
        </div>
        <label className={styles['login-btn']}>
          Login
          <button
            type="button"
            onClick={() => {
              document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              google.accounts.id.prompt();
            }}
          />
        </label>
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
