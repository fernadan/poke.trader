import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Content, Background } from './styles';
import getValidationErros from '../../util/getValidationErros';

import { useAuth } from '../../context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  user: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const [onError, setOnError] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.string()
            .required('Usuário obrigatório!'),
          password: Yup.string().required('Senha obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          userForm: data.user,
          passwordForm: data.password,
        });

        history.push('/trocar');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);

          return;
        }

        setOnError(true);
      }
    },
    [signIn, history],
  );

  return (
    <>
      <Background>
          <Content>
            <div>
              <h1>Poke Trader</h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h2>Faça o login para entrar</h2>
                <Input name="user" placeholder="Usuário" />
                <Input name="password" type="password" placeholder="Senha" />
                <Button type="submit">logar</Button>
                {onError && (
                  <span>
                    Ocorreu um erro ao fazer login, cheque as credenciais!
                  </span>
                )}
              </Form>
            </div>
          </Content>
      </Background>
    </>
  );
};

export default SignIn;
