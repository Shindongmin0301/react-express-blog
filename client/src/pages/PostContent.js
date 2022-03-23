import Post from '../Components/Post';
import { PostProvider } from '../contexts/PostContext';

const PostContent = () => {
  return (
    <PostProvider>
      <Post />
    </PostProvider>
  );
};

export default PostContent;
