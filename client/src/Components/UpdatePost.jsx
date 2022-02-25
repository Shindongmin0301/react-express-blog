import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../asset/style/createPost.css';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [postIdx, setPostIdx] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      content,
      author,
      postIdx,
    };
    fetch('/api/blog/update', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          if (window.confirm('수정 하시겠습니까?')) return navigate('/blog/' + postIdx);
          else return;
        }
      });
  }

  useEffect(() => {
    setTitle(state.title);
    setContent(state.content);
    setAuthor(state.author);
    setPostIdx(state.postIdx);
  }, []);

  return (
    <div className="container update-container">
      <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          defaultValue={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          defaultValue={content}
          onChange={e => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button className="btn btn__submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdatePost;
