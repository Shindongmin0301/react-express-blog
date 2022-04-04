import LoginForm from '../Components/LoginForm';
import { Button } from '../Components/common/Button';

const Login = ({ closeLoginForm }) => {
  return (
    <>
      <LoginForm closeLoginForm={closeLoginForm} />
    </>
  );
};

export default Login;
