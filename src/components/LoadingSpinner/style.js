import styled from 'styled-components';
import { SetupFlex } from '../../styles/globalStyle';

const SpinnerContainer = styled.div`
  ${SetupFlex};
`;

const Loading = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 20px;
  height: 20px;
  border: 3px solid ${props => props.theme.textColor}; /* Light grey */
  border-top: 3px solid ${props => props.theme.input.background}; /* Blue */
  border-radius: 50%;
  animation: spinner 0.5s linear infinite;
`;

export { SpinnerContainer, Loading };
