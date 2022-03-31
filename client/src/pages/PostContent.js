import Post from '../Components/Post';
import Comment from '../Components/POST/Comment';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import PostContext from '../contexts/PostContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  max-width: 800px !important;
  padding: 1rem;import PostContext from '../contexts/PostContext';

  margin: 0 auto;
  position: relative;
`;

const PostContent = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(null);
  const postId = useParams().id;

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get('/api/post-one', { params: { postId } });
      setLoading(true);
      try {
        setPost(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComment = async () => {
      const response = await axios.get('/api/comment', { params: { postId } });
      setLoading(true);
      try {
        setComments(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchComment();
  }, []);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const response = await axios.get('/api/post-one', {
  //       params: { postId },
  //     });
  //     setLoading(true);
  //     try {
  //       actions.setPosts(response.data);
  //       console.log(state);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchPost();

  //   const fetchComment = async () => {
  //     const response = await axios.get('/api/comment', {
  //       params: { postId },
  //     });
  //     setLoading(true);
  //     try {
  //       setComments(response.data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchComment();
  // }, [postId]);

  if (loading) return null;
  if (!post) return null;

  return (
    <PostContainer>
      <div>
        <Post user={user} post={post} />
        <Comment comments={comments} setComments={setComments} />
      </div>
    </PostContainer>
  );
};

export default PostContent;
