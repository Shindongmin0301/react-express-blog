import './UserMenu.scss';
import { useEffect, useContext, useState, useRef } from 'react';
import UserContext from '../contexts/UserContext';

import { IoMdArrowDropdown } from 'react-icons/io';
import { CreatePostBtn } from './Buttons';

const UserMenu = () => {
  const { user } = useContext(UserContext);
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <div>
      <div
        className="usermenu-wrap "
        onClick={() => {
          setDropMenu(!dropMenu);
        }}
      >
        <CreatePostBtn />
        <p className="m-0 me-2">{user.name}</p>

        <IoMdArrowDropdown className="usermenu__btn__open" />
      </div>
      {dropMenu && <DropMenu setDropMenu={setDropMenu} />}
    </div>
  );
};

const DropMenu = ({ setDropMenu }) => {
  const wrapperRef = useRef();
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });
  const handleClickOutside = e => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) setDropMenu(false);
    else setDropMenu(true);
  };

  return (
    <div className="position-relative" ref={wrapperRef}>
      <div className="dropmenu-wrap">
        <div className="dropmenu__menu">
          <ul>
            <li>내 게시글</li>
            <li>계정 설정</li>
            <li>로그아웃</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
