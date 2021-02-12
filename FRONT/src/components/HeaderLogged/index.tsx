import React, { useCallback } from 'react';

import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Container, Button } from './styles';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logoPoke.png';

const HeaderLogged: React.FC = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();

    history.push('/');
  }, [history, signOut]);

  return (
    <Container>
      <header>
        <img src={logo} alt="Poke Trader" />
        <div>
          <span>Oi, {user.nome}</span>
        </div>
        <nav>
          <ul>
            <li>
              <Button onClick={handleSignOut}>Sair</Button>
            </li>
            <li>
              <NavLink
                to="/historico"
                activeClassName={pathname === '/historico' ? 'active' : ''}
              >
                Histórico
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trocar"
                activeClassName={pathname === '/trocar' ? 'active' : ''}
              >
                Solicitar Troca
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default HeaderLogged;
