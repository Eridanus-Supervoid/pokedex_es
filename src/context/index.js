import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
  pokemonModal: false,
  fetchPokemonLoading: false,
  selectedPokemon: {
    name: null,
    stats: [],
    types: [],
    abilities: [],
  },
  spriteEndpoint:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_POKEMON_MODAL':
      return {
        ...state,
        pokemonModal: action.payload,
      };
    case 'SET_FETCH_POKEMON_LOADING':
      return {
        ...state,
        fetchPokemonLoading: action.payload,
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
