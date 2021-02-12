export interface IOperationItem {
  pokemonsSent: string[];
  userNameEnd: string;
  pokemonsReceive: string[];
}

export interface IOperationState {
  items: IOperationItem[];
}
