import './Buttons.scss';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export const LoginBtn = ({ showLoginForm }) => {
  return (
    <button className="btn__login" onClick={showLoginForm}>
      Login
    </button>
  );
};

export const CreatePostBtn = () => {
  const navigate = useNavigate();

  return (
    <button className="me-3 btn__write" onClick={() => navigate('/post/write')}>
      글쓰기
    </button>
  );
};

export const WriteSubmitBtn = ({ submitPost }) => {
  return (
    <button className="mt-3 btn__write-submit" onClick={submitPost}>
      게시하기
    </button>
  );
};
export const UpdateSubmitBtn = ({ postUpdateSubmit }) => {
  return (
    <button className="mt-3 btn__write-submit" onClick={postUpdateSubmit}>
      업데이트
    </button>
  );
};
