import './Post.scss';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import UserContext from '../contexts/UserContext';
import PostOptions from './PostOptions';

const Post = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);
  const postId = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/post-one', {
        params: { postId },
      });
      setLoading(true);
      try {
        setPost(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [postId]);

  if (loading) return false;
  if (!post) return null;

  return (
    <>
      <div className="content_wrap mt-5">
        <header>
          <h1 className="content__title">{post.title}</h1>
          <div className="mt-3 content__post-info">
            <div className="post-info__left-side">
              <p className="content__author">{post.author}</p>
              <span className="content__date">2022-03-20</span>
              <div className="content__post-tags">
                <span className="content__post-tag">tags</span>
                <span className="content__post-tag">tags</span>
              </div>
            </div>
            {user && user.user_id === post.author && <PostOptions postAuthor={post.author} postId={post.post_id} />}
          </div>
          <div className="division-line"></div>
        </header>
        <section>
          <div className="post-content mt-3">{post.content}</div>
        </section>
      </div>
    </>
  );
};

export default Post;
