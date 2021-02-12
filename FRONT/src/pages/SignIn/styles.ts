import styled from 'styled-components';
import signInBackgroundImg from '../../assets/BackLogin.jpg';

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;

  div {
    max-width: 500px;
    padding: 50px;
    border-radius: 5%;
    -webkit-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    background-color: #ffffff;

    form {
      text-align: center;

      span {
        color: #ef1e1e;
        font-family: 'Sitka Text', serif;
        font-size: 16px;
        font-weight: bold;
        margin-top: 10px;
        display: block;
      }
    }

    h1 {
    color: #27599e;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

    h2 {
      margin-bottom: 80px;
      color: #ffcb05;
      font-family: 'Sitka Text', serif;
      font-size: 30px;
      font-weight: 500;
      text-align: center;
      width: 100%;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  height: 100vh;
`;
