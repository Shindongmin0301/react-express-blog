import { createContext, useState } from 'react';

const PostContext = createContext({
  state: [],
  actions: {
    setPosts: () => {},
    setComments: () => {},
  },
});

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const value = {
    state: { posts, comments },
    actions: { setPosts, setComments },
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
const { Consumer: PostConsumer } = PostContext;

export { PostConsumer, PostProvider };
export default PostContext;
