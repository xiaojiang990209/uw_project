import React from 'react';
import Loader from 'react-loader-spinner'
import styled from 'styled-components';

const LoadContainer = styled.div`
  max-width: 950px;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
 `;

const LoadingGate = () => (
  <LoadContainer>
    <Loader
      type="Watch"
      color="#e7e7e7"
      height={200}
      width={200}
    />
  </LoadContainer>
);

export default LoadingGate;