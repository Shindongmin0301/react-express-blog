import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.button`
  font-size: 0.9rem;
  padding: 4px 12px;
  border: none;
  border-radius: 8px;
  margin-left: 0.5rem;
  color: #424242;
`;

const PostOptions = ({ postAuthor, postId }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const result = window.confirm('게시글 정말 삭제 하시나요?');
    if (!result) return;
    axios({ method: 'DELETE', url: '/api/post/delete', data: { postAuthor, postId } }).then(({ data }) => {
      if (data.success) {
        alert('게시글 삭제완료!');
        navigate('/');
      }
    });
  };

  return (
    <div>
      <Btn onClick={() => navigate(`/post/update/${postId}`)}>수정</Btn>
      <Btn onClick={handleDelete}>삭제</Btn>
    </div>
  );
};

export default PostOptions;
