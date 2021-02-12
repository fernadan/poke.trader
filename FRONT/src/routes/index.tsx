import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Troca from '../pages/Troca';
import Historico from '../pages/Historico';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/trocar" component={Troca} isLoggedOn />
    <Route path="/historico" component={Historico} isLoggedOn />
  </Switch>
);

export default Routes;
