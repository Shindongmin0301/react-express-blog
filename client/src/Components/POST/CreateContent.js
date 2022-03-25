import styled from 'styled-components';

const Textarea = styled.textarea`
  overflow: scroll;
  resize: none;
  width: 100%;
  height: 500px;
  margin-top: 12px;
  border: none;
  background: rgba(225, 225, 225, 0.2);
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-size: 1.2rem;
  }
`;

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

const CreateContent = ({ setValue }) => {
  return (
    <div>
      <Input name="title" placeholder="제목을 입력하세요.." onChange={setValue} />
      <Textarea name="content" placeholder="내용을 입력하세요 ..." onChange={setValue}></Textarea>
    </div>
  );
};

export default CreateContent;
