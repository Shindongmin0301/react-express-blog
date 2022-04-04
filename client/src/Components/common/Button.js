import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 1rem;
`;

export const Button = ({ children, className, disabled }) => {
  return (
    <StyledButton className={className} disabled={disabled ? true : false}>
      {children}
    </StyledButton>
  );
};
