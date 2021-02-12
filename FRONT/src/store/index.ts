import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';
import { IOperationState } from './modules/troca/types';

export interface IState {
  Historico: IOperationState;
}

const store = createStore(rootReducer);

export default store;
