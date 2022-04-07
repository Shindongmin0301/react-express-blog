import './Post.scss';

import PostOptions from './PostOptions';

const Post = ({ post, user }) => {
  return (
    <>
      <div className="content_wrap mt-5">
        <header>
          <h1 className="content__title">{post.title}</h1>
          <div className="mt-3 content__post-info">
            <div className="post-info__left-side">
              <p className="content__author">{post.nickname}</p>
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
