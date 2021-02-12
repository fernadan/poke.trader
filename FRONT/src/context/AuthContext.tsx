import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  Usuario: string;
  nome: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  userForm: string;
  passwordForm: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PokeTrader:token');
    const user = localStorage.getItem('@PokeTrader:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ userForm, passwordForm }) => {
    const response = await api.post('user', {
      user: userForm,
      pass: passwordForm,
    });

    const { token, id, usuario, nome } = response.data;
    console.log(token, id, usuario, nome);

    const user:User = {
      id: id,
      Usuario: usuario,
      nome: nome
    }

    localStorage.setItem('@PokeTrader:token', token);
    localStorage.setItem('@PokeTrader:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PokeTrader:token');
    localStorage.removeItem('@PokeTrader:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider!');
  }

  return context;
}
