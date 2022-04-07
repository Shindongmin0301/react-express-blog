import styled from 'styled-components';

const ContainerBlock = styled.div`
  max-width: 1000px;
  padding: 0 1rem;
  margin: 0 auto;
`;

export const Container = ({ children, className }) => {
  return <ContainerBlock className={className}>{children}</ContainerBlock>;
};
