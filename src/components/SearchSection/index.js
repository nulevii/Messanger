import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import { useEffect, useState, useRef } from 'react';

import styles from './style.module.css';

function SearchSection(props) {
  const { findPerson, conversations, setChangeSection } = props;
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userObject')));
  const loginElement = useRef(null);

  const userImg = userInfo ? userInfo.picture : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const userName = userInfo ? userInfo.name : '';

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem('userObject', JSON.stringify(userObject));
    setUserInfo(userObject);
  };

  useEffect(() => {
    if (!userInfo) {
      /* global google */
      google.accounts.id.initialize(
        {
          client_id:
            '423488661964-ln5nhcimsgdatc68sh13ihd1s861hata.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        },
        [],
      );

      google.accounts.id.renderButton(loginElement.current, {
        theme: 'outline',
      });

      google.accounts.id.prompt();
    }
  });

  return (
    <section className={styles.section}>
      <div className={styles['img-and-button']}>
        <figure className="user-img-figure">
          <img className="user-img" src={userImg} alt="User" />
          <AiOutlineCheckCircle className="user-img-tick" />
        </figure>

        <div>{userName}</div>
        <div
          ref={loginElement}
          style={!userInfo ? { display: 'block' } : { display: 'none' }}
        />
        <label
          className={styles['login-btn']}
          style={userInfo ? { display: 'block' } : { display: 'none' }}
        >
          <AiOutlineLogout />
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('userObject');
              document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              setUserInfo(null);
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
