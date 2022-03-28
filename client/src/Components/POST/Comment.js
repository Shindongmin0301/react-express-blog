import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import './Comment.scss';

const Img = styled.img`
  width: 54px;
  border-radius: 50%;
  float: left;
  margin-right: 1rem;
`;

const CommnetWrap = styled.div`
  margin-top: 1rem;
`;
const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  padding: 1rem;
  border: none;
  background: #f7e2e2;
  border-radius: 8px;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #424242;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 80px;
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  position: absolute;
  bottom: -48px;
  right: 0;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const Comment = () => {
  const CommentDb = [
    {
      comment_id: 1,
      post_id: 1,
      date: new Date(),
      commentContent: '와 너무 유익해요!',
    },
    {
      comment_id: 2,
      post_id: 1,
      date: new Date(),
      commentContent: '와 너무 유익해요!',
    },
    {
      comment_id: 3,
      post_id: 1,
      date: new Date(),
      commentContent: '와 너무 유익해요!',
    },
  ];

  return (
    <CommnetWrap>
      <div className="position-relative comment__input">
        <div>0개의 댓글</div>
        <Textarea placeholder="댓글을 입력해 보세요."></Textarea>
        <Button>댓글달기</Button>
      </div>
      <CommentList />
      <CommentList />
      <CommentList />
      <CommentList />
      <CommentList />
    </CommnetWrap>
  );
};

const CommentList = () => {
  const handleClick = () => {
    console.log('clicked!');
  };

  return (
    <ul className="list-unstyled">
      <li>
        <div className="comment__top">
          <Img className="userprofile__image" src="/images/profile.jpg" />
          <div>
            <p className="m-0 comment_username">username</p>
            <p className="comment__date">2022-03-27</p>
          </div>
        </div>
        <p className="">와 너무 유익했어요!!</p>
        <div className="comment-reply" onClick={handleClick}>
          <IoMdArrowDropdown />
          답글 보기
        </div>
      </li>
      <hr />
    </ul>
  );
};

export default Comment;
