/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Layout from './Components/Layout';
import PopularList from './pages/PopularList';
import PostContent from './pages/PostContent';
import Write from './pages/Write';
import UserContext from './contexts/UserContext';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/user/auth',
    }).then(({ data }) => {
      if (data.userInfo) {
        setUser({ ...user, name: data.userInfo.name, user_id: data.userInfo.user_id });
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PopularList />} />
          <Route path="/post-content/:id" element={<PostContent />} />
        </Route>
        <Route path="/write" element={<Write />} />
      </Routes>
    </div>
  );
};

export default App;
