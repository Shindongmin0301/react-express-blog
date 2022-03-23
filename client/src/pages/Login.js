import LoginForm from '../Components/LoginForm';
import { UserProvider } from '../contexts/UserContext';

const Login = ({ closeLoginForm }) => {
  return (
    <>
      <LoginForm closeLoginForm={closeLoginForm} />
    </>
  );
};

export default Login;
