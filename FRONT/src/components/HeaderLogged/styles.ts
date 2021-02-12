import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #ffcb05;

  header {
    color: #27599e;
    font-family: 'Sitka Text', serif;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 15px !important;
    padding-bottom: 15px !important;

    img {
      margin-left:15px;
    }

    div {
      flex: 1;

      span {
        padding-left: 50px;
        font-family: 'Sitka Text', serif;
        font-size: 30px;
        font-weight: bold;
      }
    }

    nav {
      ul {
        list-style: none;

        li {
          margin-right: 50px;
          float: right;

          a {
            color: #27599e;
            font-family: 'Sitka Text', serif;
            font-size: 25px;
            font-weight: bold;
            text-decoration: none;
            padding: 15px 40px;

            &.active {
              background-color: #27599e !important;
              color: #ffffff !important;
              border-radius: 20px;
            }
          }
        }
      }
    }
  }
`;

export const Button = styled.a`
  color: #27599e;
  font-family: 'Sitka Text', serif;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${shade(0.2, '#27599e')};
  }
`;
