import React from 'react';
import styled from 'styled-components';

import logo from './logo.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function App (): React.ReactElement {
  return (
    <Wrapper>
      <img
        src={logo}
      />
    </Wrapper>
  );
}

export default App;
