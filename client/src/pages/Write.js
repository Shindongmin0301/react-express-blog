import { useState, useEffect, useContext } from 'react';

import { WriteSubmitBtn } from '../Components/Buttons';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import CreateContent from '../Components/POST/CreateContent';

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(null);

  const onChange = e => {
    switch (e.target.name) {
      case 'title':
        return setTitle(e.target.value);
      case 'content':
        return setContent(e.target.value);
    }
  };

  const submitPost = () => {
    if (title.length < 2 || content.length < 30) return alert('제목 또는 내용의 길이가 너무 짧습니다.');
    axios({
      method: 'post',
      url: '/api/post/create',
      data: { title, content, author },
    }).then(({ data }) => {
      if (data.success) navigate(`/post-content/${data.insertId}`);
      else console.log(data);
    });
  };
  useEffect(() => {
    if (!user) {
      alert('잘못된 접근입니다.');
      return navigate('/');
    }
    setAuthor(user.user_id);
  }, []);

  return (
    <>
      <div className="page-container">
        <CreateContent setValue={onChange} />
        <WriteSubmitBtn submitPost={submitPost} />
      </div>
    </>
  );
};

export default Write;
