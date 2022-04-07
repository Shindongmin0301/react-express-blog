import './Comment.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import styled from 'styled-components';
import timeDiffCalc from '../../lib/timeDiffCalc';
import useComments from '../../hooks/useComments';

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
  const [comments, setComments] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const postId = useParams().id;

  const fetch = {
    url: '/api/comments',
    params: { postId },
  };
  const { data, loading, error } = useApi(fetch);
  const { onSubmit } = useComments(postId, commentInput, setCommentInput, comments, setComments);

  useEffect(() => {
    setComments(data);
  }, [fetch]);
  if (loading) return null;
  if (!comments) return null;

  console.log(comments);
  return (
    <CommnetWrap>
      <div className="position-relative comment__input">
        <div>{comments.length}개의 댓글</div>
        <form onSubmit={onSubmit}>
          <Textarea
            placeholder="댓글을 입력해 보세요."
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
          ></Textarea>
          <Button>댓글달기</Button>
        </form>
      </div>
      <ul className="list-unstyled">
        {comments.map(comment => (
          <CommentItem key={comment.comment_id} comment={comment} />
        ))}
      </ul>
    </CommnetWrap>
  );
};

const CommentItem = React.memo(({ comment }) => {
  const date = new Date(comment.date);
  const commentDate = timeDiffCalc(date);
  return (
    <li>
      <div className="comment__top">
        <Img className="userprofile__image" src="/images/profile.jpg" />
        <div>
          <p className="m-0 comment_username">{comment.nickname}</p>
          <p className="comment__date">{commentDate}</p>
        </div>
      </div>
      <p className="">{comment.content}</p>
      <hr className="comment__hr" />
    </li>
  );
});

export default Comment;
