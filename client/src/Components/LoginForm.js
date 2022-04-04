import './LoginForm.scss';

import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { Button } from './common/Button';

const LoginForm = ({ closeLoginForm }) => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const onChange = e => {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value);
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
        email,
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
    <>
      <div className="container-fluid login-wrap">
        <div className="login-background">
          <CgClose className="btn__close-login" onClick={closeLoginForm} />
          <h1 className="text-center login-heading">Login</h1>
          <form className="login-form" onSubmit={onSubmit}>
            <div className="mb-3">
              <input type="text" name="email" className="input__email" onChange={onChange} />
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="input__password" onChange={onChange} />
            </div>

            <button className="btn btn__login">Login</button>
            <Button>Register</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
