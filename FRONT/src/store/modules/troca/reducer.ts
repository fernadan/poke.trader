import { Reducer } from 'redux';
import { IOperationState } from './types';

const INITIAL_STATE: IOperationState = {
  items: [],
};

const Troca: Reducer<IOperationState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DO_EXCHANGE_POKE': {
      const { oper } = action.payload;

      return {
        ...state,
        items: [state.items, oper],
      };
    }
    default: {
      return state;
    }
  }
};

export default Troca;
