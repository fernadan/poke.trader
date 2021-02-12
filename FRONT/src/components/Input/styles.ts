import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;
  border: 0;
  border-bottom: 2px solid #797979;
  padding: 50px 0 !important;
  color: #7b7b7b;
  border-radius: 0 !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
  height: 20px !important;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
    margin-bottom: 50px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: #ac3030;
      border: 2px solid #ac3030 !important;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ffcb05;
      border-color: #ffcb05;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ffcb05;
    `}

  input {
    color: #ffcb05;
    flex: 1;
    background: transparent;
    border: 0;
    font-family: 'Sitka Text', serif;
    font-size: 28px;
    font-weight: 500;

    &::placeholder {
      color: #7b7b7b;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  padding: 0 !important;

  svg {
    margin: 0;
  }

  background-color: transparent !important;
  border: none;
  box-shadow: none !important;
  margin-right: 10px !important;

  span {
    background: #27599e;
    color: #f4ede8;

    &::before {
      border-color: #27599e transparent;
    }
  }
`;
