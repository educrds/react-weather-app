import React from 'react';
import { SpinnerContainer, Loading } from './style';

const LoadingSpinner = React.memo(() => (
  <SpinnerContainer>
    <Loading />
  </SpinnerContainer>
));

export default LoadingSpinner;
