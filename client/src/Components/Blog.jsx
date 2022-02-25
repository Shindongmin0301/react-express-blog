import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import '../asset/style/blog.css';

function Blog({ user, ...props }) {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  function checkUser(e) {
    e.preventDefault();
    fetch('api/check-auth', { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          navigate('create');
        } else {
          alert('로그인이 필요한 기능입니다. 로그인페이지로 이동합니다.');
          navigate('/login', { state: '/blog/create' });
        }
      });
  }

  useEffect(() => {
    fetch('api/blog', { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        setPost(res.BlogRecord);
      });
  }, []);
  return (
    <div className="container blog-container">
      <h1 className="text-center mt-3">Blog</h1>
      <ListGroup as="ul" className="position-relative post__lists">
        <Button variant="warning" className="btn__createPost">
          <Link to="/blog/create" onClick={checkUser}>
            글쓰기
          </Link>
        </Button>
        {post.map(li => {
          return <PostList key={li.post_idx} li={li} postIdx={li.post_idx} />;
        })}
      </ListGroup>
    </div>
  );
}

function PostList({ li, postIdx }) {
  return (
    <div className="container">
      <ListGroup.Item as="li" className="d-flex justify-content-between post__list">
        <Link to={`/blog/${postIdx}`} className="link__detail">
          <h5 className="post__title">{li.title}</h5>
        </Link>
        <div className="post-info">
          <p className="">작성자: {li.author}</p>
          <p>{li.createDate}</p>
        </div>
      </ListGroup.Item>
    </div>
  );
}

export default Blog;
