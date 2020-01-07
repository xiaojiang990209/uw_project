import React from 'react';

import Loader from 'react-loaders';

const LoadingGate = ({ label }) => (
  <>
    <Loader type="pacman"/>
    <div>{label}</div>
  </>
);

export default LoadingGate;