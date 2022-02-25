import { useState } from 'react';
import { useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import '../asset/style/login.css';

function LoginForm(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const state = location.state;

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          props.setUser(res.user);
          return navigate(state ? state : '/');
        }
      });
  }
  return (
    <form onSubmit={handleSubmit} className="login">
      <div className="login__field">
        <i className="login__icon fas fa-user"></i>
        <input
          type="text"
          onChange={e => {
            setEmail(e.target.value);
          }}
          className="login__input js-input__email"
          placeholder="User Email"
        />
      </div>
      <div className="login__field">
        <i className="login__icon fas fa-lock"></i>
        <input
          type="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          className="login__input js-input__password"
          placeholder="Password"
        />
      </div>
      <button className="button login__submit">
        <span className="button__text">Log In Now</span>
        <i className="button__icon fas fa-chevron-right"></i>
      </button>
    </form>
  );
}

export default LoginForm;
