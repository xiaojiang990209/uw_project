import React from 'react';
import styled from "styled-components";

const ComingSoonContainer = styled.div`
  max-width: 950px;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
 `;

const ComingSoon = () => (
  <ComingSoonContainer>
   <h1>Coming Soon...</h1>
  </ComingSoonContainer>
);

export default ComingSoon;