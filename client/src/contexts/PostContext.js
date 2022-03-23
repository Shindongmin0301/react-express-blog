import { createContext, useState } from 'react';

const PostContext = createContext({
  state: [
    {
      post_id: 0,
      title: 'title',
      content: 'content',
      author: 0,
    },
  ],
  actions: {
    setPosts: () => {},
  },
});

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const value = {
    state: { posts },
    actions: { setPosts },
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
const { Consumer: PostConsumer } = PostContext;

export { PostConsumer, PostProvider };
export default PostContext;
