import axios from 'axios';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';

const useLogin = closeLoginForm => {
  const { user, setUser } = useContext(UserContext);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);

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

  const onChange = e => {
    switch (e.target.name) {
      case 'id':
        return setId(e.target.value);
      case 'password':
        return setPassword(e.target.value);
    }
  };
  console.log(id, password);
  return { onChange, onSubmit };
};

export default useLogin;
