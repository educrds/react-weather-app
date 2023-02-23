import styled, { css } from 'styled-components';

const SquareStyle = css`
  border-radius: 0.35rem;
  border: solid 1px ${props => props.theme.input.border};
  height: 40px;
  background-color: ${props => props.theme.input.background};
  color: ${props => props.theme.input.textColor};
  font-size: 1rem;
`;

const Select = styled.select`
  ${SquareStyle};
  width: 125px;
  padding: 0 0.5vw;
`;

export { Select, SquareStyle };
