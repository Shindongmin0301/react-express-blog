import './UserMenu.scss';
import { useEffect, useContext, useState, useRef } from 'react';
import UserContext from '../contexts/UserContext';

import { IoMdArrowDropdown } from 'react-icons/io';
import { CreatePostBtn } from './Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <div>
      <div className="usermenu-wrap ">
        <CreatePostBtn />
        <div
          className="d-flex align-items-center"
          onClick={() => {
            setDropMenu(!dropMenu);
          }}
        >
          <p className="m-0 me-2">{user.nickname}</p>
          <IoMdArrowDropdown className="usermenu__btn__open" />
        </div>
      </div>
      {dropMenu && <DropMenu setDropMenu={setDropMenu} setUser={setUser} user_id={user.user_id} />}
    </div>
  );
};

const DropMenu = ({ setDropMenu, setUser, user_id }) => {
  const navigate = useNavigate();
  const wrapperRef = useRef();

  useEffect(() => {
    // 드롭메뉴 바깥 클릭시 닫기
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const handleClickOutside = e => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) setDropMenu(false);
    else setDropMenu(true);
  };

  const logout = () => {
    axios({
      method: 'post',
      url: '/api/user/logout',
      data: {
        user_id,
      },
    });
    document.cookie = '';
    setUser(null);
    navigate('/');
  };

  return (
    <div className="position-relative" ref={wrapperRef}>
      <div className="dropmenu-wrap">
        <div className="dropmenu__menu">
          <ul>
            <li>내 게시글</li>
            <li>계정 설정</li>
            <li onClick={logout}>로그아웃</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
