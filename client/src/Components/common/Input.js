import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 1rem;

  &:focus {
    outline: none;
  }
`;

const Input = ({ className, onChange, placeholder, type, name }) => {
  return (
    <StyledInput
      autoComplete="off"
      className={className}
      name={name}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
