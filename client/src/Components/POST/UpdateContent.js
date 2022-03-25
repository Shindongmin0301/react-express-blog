import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UpdateSubmitBtn } from '../Buttons';

import { useParams, useNavigate } from 'react-router-dom';

const Textarea = styled.textarea`
  overflow: scroll;
  resize: none;
  width: 100%;
  height: 500px;
  margin-top: 12px;
  border: none;
  background: rgba(225, 225, 225, 0.2);
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 2rem;
  padding-bottom: 1rem;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
  border: none;
  border-bottom: 2px solid black;

  &:focus {
    outline: none;
  }
`;

const UpdateContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  const postId = useParams().id;
  const onChange = e => {
    switch (e.target.name) {
      case 'title':
        return setTitle(e.target.value);
      case 'content':
        return setContent(e.target.value);
    }
  };

  const postUpdateSubmit = () => {
    if (title.length < 2 || content.length < 30) return alert('제목 또는 내용의 길이가 너무 짧습니다.');
    axios({
      method: 'PUT',
      url: '/api/post/update',
      data: { title, content, author, postId },
    }).then(({ data }) => {
      if (data.success) {
        alert('게시글이 수정 되었습니다.');
        navigate(`/post-content/${postId}`);
      }
    });
  };

  useEffect(() => {
    axios.get('/api/post-one', { params: { postId } }).then(({ data }) => {
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    });
  }, []);
  return (
    <div>
      <Input name="title" placeholder="제목을 입력하세요..." value={title} onChange={onChange} />
      <Textarea name="content" placeholder="내용을 입력하세요 ..." value={content} onChange={onChange}></Textarea>
      <UpdateSubmitBtn postUpdateSubmit={postUpdateSubmit} />
    </div>
  );
};

export default UpdateContent;
