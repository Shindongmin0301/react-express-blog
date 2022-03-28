import Post from '../Components/Post';
import Comment from '../Components/POST/Comment';
import styled from 'styled-components';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  max-width: 800px !important;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
`;

const PostContent = () => {
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
