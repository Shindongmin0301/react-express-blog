import '../asset/style/createPost.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setAuthor(user);
    const data = {
      title,
      content,
      author,
    };
    fetch('/api/blog/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          alert('게시글 작성 완료!');
          navigate(`/blog/${res.postIdx}`);
        }
      });
  }

  const fetchData = async () => {
    const data = await fetch('/api/check-auth', { method: 'POST' });
    return data;
  };

  useEffect(() => {
    setAuthor(user);
    fetchData()
      .then(res => res.json())
      .then(res => {
        if (!res.user) {
          alert('로그인 페이지로 이동합니다.');
          navigate('/login', { state: '/blog/create' });
        }
      });
  }, [user]);
  if (user) {
    return (
      <div className="container create-container">
        <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            onChange={e => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button className="btn btn__submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return '404 NOT FOUND';
  }
}

export default CreatePost;
