import { IOperationItem } from './types';

export function doExchangePoke(oper: IOperationItem) {
  return {
    type: 'DO_EXCHANGE_POKE',
    payload: {
      oper,
    },
  };
}