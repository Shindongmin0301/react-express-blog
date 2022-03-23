import './Buttons.scss';
import { useNavigate } from 'react-router-dom';

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
    <button className="me-3 btn__write" onClick={() => navigate('/write')}>
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
