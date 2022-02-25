import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';
import '../asset/style/post.css';

function Post({ userIdx }) {
  const [post, setPost] = useState('');
  const [authorIdx, setAuthorIdx] = useState(null);

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    fetch(`/api/blog/find-one/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        setPost(res.BlogRecord);
        setAuthorIdx(res.BlogRecord.authorIdx);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Post Detail</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>날짜: {post.createDate}</p>
      {userIdx === authorIdx ? <PostOptions id={id} post={post} /> : ''}
    </div>
  );
}

function PostOptions({ id, post }) {
  const navigate = useNavigate();

  function deletePost() {
    fetch('/api/blog/delete', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ postIdx: id }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert('게시글이 삭제되었습니다!');
          navigate('/blog');
        }
      });
  }

  return (
    <div className="container">
      <Link
        to={`/blog/update?postIdx=${id}`}
        state={{ title: post.title, content: post.content, author: post.author, postIdx: id }}
      >
        <button className="btn me-3 btn__update">수정</button>
      </Link>
      <button className="btn btn__delete" onClick={deletePost}>
        삭제
      </button>
    </div>
  );
}

export default Post;
