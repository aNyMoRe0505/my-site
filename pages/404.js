import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px 15px;
`;

export default function Custom404() {
  return (
    <Root>
      <h1>404 - Page Not Found</h1>
      <h1>Work In Progress</h1>
    </Root>
  );
}
