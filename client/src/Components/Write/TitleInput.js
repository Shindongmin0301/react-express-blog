import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 2rem;
  padding-bottom: 1rem;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
  border: none;
  border-bottom: 2px solid black;

  &:focus {
    outline: none;
  }
`;

const TitleInput = ({ setValue }) => {
  return (
    <div>
      <Input name="title" placeholder="제목을 입력하세요.." onChange={setValue} />
    </div>
  );
};

export default TitleInput;
