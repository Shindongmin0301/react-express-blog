import '../styles/LoginForm.scss';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';

const Login = ({ closeLoginForm }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

  const onChange = e => {
    switch (e.target.name) {
      case 'id':
        return setId(e.target.value);
      case 'password':
        return setPassword(e.target.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/login',
      data: {
        id,
        password,
      },
    }).then(({ data }) => {
      if (data.success) {
        setUser(data.userInfo);
        closeLoginForm();
      } else return alert("That's not correct info");
    });
  };

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
