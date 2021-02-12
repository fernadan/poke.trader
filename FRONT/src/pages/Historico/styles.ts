import styled from 'styled-components';

export const Container = styled.div`
  background-color: #efefef;
`;

export const Content = styled.div`
  article {
    width: 96%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
    background-color: #ffffff;
    padding: 50px;
    margin: 50px;
    float: left;

    h3 {
      font-family: 'Sitka Text', serif;
      font-size: 30px;
      color: #27599e;
      margin-top: 10px;
      width: 100%;
      float:left;

      strong {
        font-weight: bold;
      }
    }

    div {
        margin-top: 30px;
        margin-bottom: 30px;

      div {
          background-color: #27599e;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          float: left;
          margin-right: 20px;

        span {
          padding: 20px;
          font-family: 'Roboto', sans-serif;
          font-size: 20px;
          color: #ffcb05;
          font-weight:bold;
          margin: 5px;
        }

        img {
          background-color: #FFF;
        }
      }
    }
  }
`;
