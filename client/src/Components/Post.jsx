import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

function Post() {
  const [post, setPost] = useState('');
  const [inProp, setInProp] = useState(false);

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    fetch(`/api/blog/find-one/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        setPost(res.BlogRecord);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Post Detail</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>날짜: {post.createDate}</p>
    </div>
  );
}

export default Post;
