import styled from 'styled-components';

export const Container = styled.div`
  background-color: #efefef;
`;

export const Content = styled.main`
  display: flex;
  margin: 50px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
  box-shadow: 0px 0px 30px 0px rgba(50, 50, 50, 0.5);
  padding: 50px 30px;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;

  Button {
    color: #27599e;
  }
`;

export const ItemsPokemons = styled.div`
  width: 100%;
  display:flex;
`;

export const Pokemons = styled.div`
  width: 50%;
  float:left;
  border-radius: 10px;
  border: 3px solid #27599e;
  padding: 10px;

  & + div {
    margin-left: 20px;
  }

  div {
    width: 100%;
    float: left;

    h3 {
      color: #27599e;
      font-family: 'Sitka Text', serif;
      font-size: 30px;
      font-weight: bold;
      float: left;
    }

    h4 {
      color: #27599e;
      font-family: 'Sitka Text', serif;
      font-size: 20px;
      float: left;
      padding-top: 10px;

      strong {
        font-weight: bold;
      }
    }

    select {
      font-size: 20px;
      margin-left: 10px;
      padding: 5px;
      min-width: 200px;
      background-color: #ffcb05;
      color: #27599e;
      font-family: 'Sitka Text', serif;
      font-weight: bold;
    }
  }

  ul {
    margin-top: 20px;
    list-style-type: none;

    li {
      background-color: #27599e;
      padding: 20px;
      font-weight: bold;
      font-size: 18px;
      float: left;
      margin: 5px;

      flex-direction: row;
      align-items: center;
      justify-content: center;
      display: flex;

      input {
        margin-right: 10px;
      }
    }
  }
`;

export const Cadastro = styled.div`
  width: 60%;
  h3 {
    color: #c1c470;
    font-family: 'Sitka Text', serif;
    font-size: 30px;
    font-weight: bold;
  }
`;

export const Space = styled.div`
  /*width: 40%;*/
  text-align: center;
  margin-top: 50px;

  span {
    font-family: 'Sitka Text', serif;
    font-size: 16px;
    font-weight: bold;
    color: #ef1e1e;
    width: 100%;
    float: left;

    p {
      color: #0b700b;
    }
  }

  button {
    float: right;
    width: 25%;
  }
`;

export const Line = styled.div`
  display: inline;
  width: 100%;
  margin-top: 10px;
  float: left;

  span {
    font-family: 'Sitka Text', serif;
    font-size: 28px;
    font-weight: 500;
    color: #7b7b7b;

    width: 30%;
    float: left;
    margin-top: 30px;
  }

  p {
    font-family: 'Sitka Text', serif;
    font-size: 28px;
    font-weight: 500;
    color: #7b7b7b;

    margin-top: 10px;
    width: 100%;
  }

  input {
    max-width: 1000px !important;
  }
`;
