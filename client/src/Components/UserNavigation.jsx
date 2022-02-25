import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import '../asset/style/UserNavigation.css';

function UserNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname !== '/') {
    return (
      <div className="container navigation-container">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="me-3 btn__goback"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    );
  } else return '';
}

export default UserNavigation;
