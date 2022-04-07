import '../styles/PostList.scss';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PostContext from '../contexts/PostContext';
import { Container } from '../Components/common/Container';

const PostList = () => {
  const navigate = useNavigate();

  const { state, actions } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const posts = state.posts;

  useEffect(() => {
    // 포스트 로딩 비동기 함수
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('api/post');
        actions.setPosts(response.data);
        setLoading(false);
      } catch (e) {
        alert('일시적인 오류가 발생했습니다.');
        navigate('/');
      }
    };
    fetchData();
  }, []);

  if (loading) return null;
  if (!posts) return null;
  return (
    <div>
      <Container className="mt-5">
        <div className="row">
          {posts.map(post => {
            return (
              <PopularPostItem
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                content={post.content}
                author={post.author}
                nickname={post.nickname}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

const PopularPostItem = ({ id, title, nickname, author }) => {
  const navigate = useNavigate();
  const onClick = id => {
    navigate(`/post-content/${id}`);
  };

  return (
    <div className="col-lg-4 col-sm-6">
      <Card className="mb-3 card-wrap" onClick={() => onClick(id)}>
        <Card.Img variant="top" src={'images/post-default-image.png'} />
        <Card.Body>
          <Card.Title className="text-center card-title">{title}</Card.Title>
          <Card.Text className="text-center">{}</Card.Text>
          <Card.Text className="text-center">작성자: {nickname}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostList;
