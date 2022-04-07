import '../styles/LoginForm.scss';
import { useNavigate } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import useLogin from '../hooks/useLogin';

const Login = ({ closeLoginForm }) => {
  const navigate = useNavigate();
  const { onChange, onSubmit } = useLogin(closeLoginForm);

  return (
    <div className="container-fluid login-wrap">
      <div className="login-background">
        <CgClose className="btn__close-login" onClick={closeLoginForm} />
        <h1 className="text-center login-heading">Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <div className="mb-3">
            <input type="text" name="id" className="input__id" onChange={onChange} />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="input__password" onChange={onChange} />
          </div>
          <button className="btn btn__login">Login</button>
          <button
            type="button"
            className="btn btn__register mt-2"
            onClick={() => {
              closeLoginForm();
              navigate('/register');
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
