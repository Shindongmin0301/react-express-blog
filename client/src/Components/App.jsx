/* eslint-disable */
import '../asset/style/App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../asset/style/App.css';

import Navbar from './Navbar';
import UserNavigation from './UserNavigation';
import Blog from './Blog';
import LoginForm from './LoginForm';
import Post from './Post.jsx';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';

function App() {
  const [user, setUser] = useState(null);
  const [userIdx, setUserIdx] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch('/api/check-auth', { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        setUser(res.user);
        setUserIdx(res.userIdx);
      });
  });
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <UserNavigation />
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/blog" element={<Blog user={user} />} />
        <Route path="/blog/:id" element={<Post userIdx={userIdx} />} />
        <Route path="/blog/update" element={<UpdatePost />} />
        <Route path="/blog/create" element={<CreatePost user={user} />} />
        <Route path="/user-menu" element={<h1>User Menu</h1>} />
      </Routes>
    </div>
  );
}

export default App;
