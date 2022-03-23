import { useState, useEffect, useContext } from 'react';

import ContentInput from '../Components/Write/ContentInput';
import TitleInput from '../Components/Write/TitleInput';
import { WriteSubmitBtn } from '../Components/Buttons';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

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
      console.log(data);
      if (data.success) navigate(`/post-content/${data.insertId}`);
      else console.log(data);
    });
  };
  useEffect(() => {
    if (!user) navigate('/');
    setAuthor(user.user_id);
  }, [user]);

  return (
    <>
      <div className="page-container">
        <TitleInput setValue={onChange} />
        <ContentInput setValue={onChange} />
        <WriteSubmitBtn submitPost={submitPost} />
      </div>
    </>
  );
};

export default Write;
