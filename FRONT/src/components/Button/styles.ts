import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ffcb05;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fcfcf8;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;
  font-family: 'Sitka Text', serif;
  font-size: 25px;
  font-weight: bold;

  &:hover {
    background: ${shade(0.2, '#ffcb05')};
  }
`;
