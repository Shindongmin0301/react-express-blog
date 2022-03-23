/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import PopularList from './pages/PopularList';
import PostContent from './pages/PostContent';
import Write from './pages/Write';
import UserContext from './contexts/UserContext';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // setUser({ ...user, name: 'dongmin', user_id: 1 });
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
