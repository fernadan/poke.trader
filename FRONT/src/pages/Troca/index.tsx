import React, { useRef, useEffect, useCallback, useState } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import HeaderLogged from '../../components/HeaderLogged';
// import Input from '../../components/Input';
import Button from '../../components/Button';

// import novoProduto from '../../assets/cadastro-produto.png';
// import { IProductItem } from '../../store/modules/Historico/types';

import { Container, Content, Pokemons, ItemsPokemons, Cadastro, Space, Line } from './styles';
// import { addProductToHistorico } from '../../store/modules/Historico/actions';

// import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import getValidationErros from '../../util/getValidationErros';

interface User {
  id: string;
  nome: string;
}

interface Pokemon {
  id: string;
  nome: string;
  foto: string;
  base_experience: number;
}

interface Exchange {
  userIdStart: string;
  pokemonsSent: Pokemon[];
  userIdEnd: string | undefined;
  pokemonsRec: Pokemon[];
}

const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [selectNames, setSelectNames] = useState<User[]>([]);
  const [amigosSelecionado, setAmigosSelecionado] = useState<User>();

  const [meusPokemons, setMeusPokemons] = useState<Pokemon[]>([]);
  const [pokemonsAmigo, setPokemonsAmigo] = useState<Pokemon[]>([]);

  const [meusPokemonsSelecionados, setMeusPokemonsSelecionados] = useState<Pokemon[]>([]);
  const [pokemonsAmigoSelecionados, setPokemonsAmigoSelecionados] = useState<Pokemon[]>([]);

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (meusPokemons.length <= 0) {
      api.get('user/' + user.id).then((reponse) => {
        setMeusPokemons(reponse.data.pokemons);
      });
    }
  }, [selectNames, user.id]);

  useEffect(() => {
    if (selectNames.length <= 0) {
      api.get('user/listaselect/' + user.id).then((reponse) => {
        setSelectNames(reponse.data);
      });
    }
  }, [selectNames, user.id]);

  const handleChange = useCallback(
    async (e) => {
      if (e.currentTarget.value != '')
      {
        setAmigosSelecionado({
            id: e.currentTarget.value,
            nome: e.currentTarget.name
        });
        await api.get('/user/' + e.currentTarget.value).then((response) => {
            setPokemonsAmigo(response.data.pokemons);
        });
      }
  }, []);

  const handleExchange = useCallback(
    async () => {
      if (meusPokemonsSelecionados.length > 0 && pokemonsAmigoSelecionados.length > 0)
      {
        const ex:Exchange = {
          userIdStart: user.id,
          pokemonsSent: meusPokemonsSelecionados,
          userIdEnd: amigosSelecionado?.id,
          pokemonsRec: pokemonsAmigoSelecionados
        }

        const sumBESent = meusPokemonsSelecionados.reduce((totalpokes, poke)=> (totalpokes + Number(poke.base_experience)), 0);
        const sumBERec = pokemonsAmigoSelecionados.reduce((totalpokes, poke)=> (totalpokes + Number(poke.base_experience)), 0);

        if ((sumBESent < sumBERec - 5 || sumBESent > sumBERec + 5) && (sumBERec < sumBESent - 5 || sumBERec > sumBESent + 5))
        {
          alert("Esta troca não é justa.\n\nO total dos pokemons selecionados em ambos os lados precisa ser o mais próxima possível, sendo permitido no máximo 5 pontos de diferença, para mais ou para menos.");
        }
        else
        {
            await api.post('/exchange', ex).then((response) => {
              setMeusPokemons([]);
              setPokemonsAmigo([]);

              const meusPokemonsAtualizado = meusPokemons;
              meusPokemonsSelecionados.forEach((poke) => {
                meusPokemonsAtualizado.splice(meusPokemons.findIndex(f => f.id === poke.id), 1);
              });

              pokemonsAmigoSelecionados.forEach((poke) => {
                meusPokemonsAtualizado.push(poke);
              });

              setMeusPokemons(meusPokemonsAtualizado);

              const amigosPokemonsAtualizado = pokemonsAmigo;
              pokemonsAmigoSelecionados.forEach((poke) => {
                amigosPokemonsAtualizado.splice(pokemonsAmigo.findIndex(f => f.id === poke.id), 1);
              });

              meusPokemonsSelecionados.forEach((poke) => {
                amigosPokemonsAtualizado.push(poke);
              });

              setPokemonsAmigo(amigosPokemonsAtualizado);

              setMeusPokemonsSelecionados([]);
              setPokemonsAmigoSelecionados([]);
          });
        }
      }
  }, [meusPokemonsSelecionados, pokemonsAmigoSelecionados, meusPokemons, pokemonsAmigo]);

  const handleCheckedMeus = useCallback(
    (e) => {
      if (e.target.checked)
      {
        if (meusPokemonsSelecionados.length < 6)
        {
          const newSelecionado = meusPokemons.find(f => f.id === e.target.value);

          setMeusPokemonsSelecionados([...meusPokemonsSelecionados, newSelecionado as Pokemon]);
        }
        else
        {
          alert("Você já tem 6 pokemons selecionados para enviar.\n\nEste é o limite para a operação.");
          e.target.checked = false;
        }
      }
      else
      {
        setMeusPokemonsSelecionados(meusPokemonsSelecionados.filter(f => f.id != e.target.value));
      }
    }, [meusPokemonsSelecionados, meusPokemons]);

  const handleCheckedAmigo = useCallback(
    (e) => {
      if (e.target.checked)
      {
        if (pokemonsAmigoSelecionados.length < 6)
        {
          const newSelecionado = pokemonsAmigo.find(f => f.id === e.target.value);

          setPokemonsAmigoSelecionados([...pokemonsAmigoSelecionados, newSelecionado as Pokemon]);
        }
        else
        {
          alert("Você já tem 6 pokemons selecionados para receber.\n\nEste é o limite para a operação.");
          e.target.checked = false;
        }
      }
      else
      {
        setPokemonsAmigoSelecionados(pokemonsAmigoSelecionados.filter(f => f.id != e.target.value));
      }
    }, [pokemonsAmigoSelecionados, pokemonsAmigo]);

  return (
    <Container>
      <HeaderLogged />
      <Content>
        <ItemsPokemons>
          <Pokemons>
            <div>
              <h3>Meus Pokemons ({meusPokemons.length})</h3>
            </div>
            <ul>
            {meusPokemons.length > 0 && meusPokemons.map((poke, idx) => (
                <li key={idx}>
                  <img src={poke.foto}/>
                  <input value={poke.id} type="checkbox" onChange={handleCheckedMeus}/>{poke.nome} ({poke.base_experience})
                </li>
              ))}
            </ul>
            <div>
              <h4>Total a ser enviado: <strong>{meusPokemonsSelecionados.reduce((totalpokes, poke)=> (totalpokes + Number(poke.base_experience)), 0)}</strong> em <strong>{meusPokemonsSelecionados.length}</strong> selecionados.</h4>
            </div>
          </Pokemons>
          <Pokemons>
            <div>
              <h3>Selecionar Pokemons de </h3>
              <select onChange={handleChange}>
                <option value=""></option>
                {selectNames.length > 0 && selectNames.map((name, id) => (
                  <option key={name.id} id={name.nome} value={name.id}>{name.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <h4>Seu amigo tem <strong>({pokemonsAmigo.length})</strong> pokemons disponíveis.</h4>
            </div>
            <ul>
              {pokemonsAmigo.length > 0 && pokemonsAmigo.map((poke, idx) => (
                <li key={idx}>
                  <img src={poke.foto}/>
                  <input value={poke.id} type="checkbox" onChange={handleCheckedAmigo}/>{poke.nome} ({poke.base_experience})
                </li>
              ))}
            </ul>
            <div>
              <h4>Total a ser recebido: <strong>{pokemonsAmigoSelecionados.reduce((totalpokes, poke)=> (totalpokes + Number(poke.base_experience)), 0)}</strong> em <strong>{pokemonsAmigoSelecionados.length}</strong> selecionados.</h4>
            </div>
          </Pokemons>
        </ItemsPokemons>
        <Button onClick={handleExchange}>Realizar Troca</Button>
      </Content>
    </Container>
  );
};

export default Product;
