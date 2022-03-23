import PopluarPost from '../Components/PopularPost';
import { PostProvider } from '../contexts/PostContext';

const Popular = () => {
  return (
    <div>
      <PostProvider>
        <PopluarPost />
      </PostProvider>
    </div>
  );
};

export default Popular;
