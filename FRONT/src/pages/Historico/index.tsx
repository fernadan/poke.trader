import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content } from './styles';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

import HeaderLogged from '../../components/HeaderLogged';

interface Pokemon {
  id: string;
  nome: string;
  foto: string;
  base_experience: number;
}

interface historic {
  userStartPointName: string;
  pokemonsSent: Pokemon[];
  userEndPointName: string;
  pokemonsRec: Pokemon[];
}

const Historico: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [historic, setHistoric] = useState<historic[]>([]);

  useEffect(() => {
    if (historic !== null) {
      api.get('historic/' + user.id).then((reponse) => {
        setHistoric(reponse.data);
      });
    }
  }, [historic, user.id]);

  return (
    <Container>
      <HeaderLogged />
      <Content>
        {historic.length > 0 &&
          historic.map((hist, idx) => (
            <article key={idx}>
              <h3><strong>{hist.userStartPointName}</strong> enviou:</h3>
              <div>
              {hist.pokemonsSent.map((sent) => (
                  <div>
                    <img src={sent.foto}/>
                    <span>{sent.nome} ({sent.base_experience})</span>
                  </div>
              ))}
              </div>
              <h3><strong>{hist.userEndPointName}</strong> enviou:</h3>
              <div>
              {hist.pokemonsRec.map((recv) => (
                  <div>
                    <img src={recv.foto}/>
                    <span>{recv.nome} ({recv.base_experience})</span>
                  </div>
              ))}
              </div>
            </article>
          )
        )}
      </Content>
    </Container>
  );
};

export default Historico;
