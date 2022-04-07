import Post from '../Components/Post';
import Comment from '../Components/POST/Comment';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useApi from '../hooks/useApi';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  max-width: 800px !important;
  padding: 1rem;import PostContext from '../contexts/PostContext';

  margin: 0 auto;
  position: relative;
`;

const PostContent = () => {
  // const { user } = useContext(UserContext);
  // const postId = useParams().id;

  // const commentFetch = {
  //   url: '/api/comment',
  //   params: { postId },
  // };
  // const { data: comments, loading: commentLoading, err: commentErr } = useApi(commentFetch);

  // if (postLoading || commentLoading) return null;
  // if (!post) return null;

  return (
    <PostContainer>
      <div>
        <Post />
        <Comment />
      </div>
    </PostContainer>
  );
};

export default PostContent;
