import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import timeDiffCalc from '../../lib/timeDiffCalc';
import './reply.scss';

const ReplyContainer = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 1rem 2rem;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50%;
  float: left;
  margin-right: 1rem;
`;

const Reply = ({ replys }) => {
  return (
    <ReplyContainer>
      <ul className="list-unstyled">
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
      </ul>
    </ReplyContainer>
  );
};

const ReplyItem = () => {
  return (
    <li>
      <Img className="userprofile__image" src="/images/profile.jpg" />
      <div>
        <p className="m-0 reply_username">유저이름</p>
        <p className="reply__date">2022-02-02</p>
      </div>
      <p className="reply__content">답글내용</p>
      <hr className="reply__hr" />
    </li>
  );
};

export default Reply;
