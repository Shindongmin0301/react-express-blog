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

const ContentInput = ({ setValue }) => {
  return (
    <div>
      <Textarea name="content" placeholder="내용을 입력하세요 ..." onChange={setValue}></Textarea>
    </div>
  );
};

export default ContentInput;
