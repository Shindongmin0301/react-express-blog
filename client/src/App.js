/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PostProvider } from './contexts/PostContext';
import axios from 'axios';

import Layout from './Components/Layout';
import PostList from './pages/PostList';
import PostContent from './pages/PostContent';
import Write from './pages/Write';
import Update from './pages/Update';
import UserContext from './contexts/UserContext';
import Register from './pages/Register';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/user/auth',
    }).then(({ data }) => {
      if (data.userInfo) {
        console.log(data);
        setUser({ ...user, nickname: data.userInfo.nickname, user_id: data.userInfo.user_id });
      }
    });
  }, [pathname]);

  return (
    <div>
      <PostProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PostList />} />
            <Route path="/post-content/:id" element={<PostContent />} />
            <Route path="/post/write" element={<Write />} />
            <Route path="/post/update/:id" element={<Update />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </PostProvider>
    </div>
  );
};

export default App;
