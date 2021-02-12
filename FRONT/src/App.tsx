import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';

import store from './store';

import { AppProvider } from './context';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
