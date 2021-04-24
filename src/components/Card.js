import React, { useContext } from 'react';
import { StoreContext } from '../context';
import { wordsToUppercase } from '../utilities'
import { getPokemon, getTypesLang } from '../api/pokeapi';
import { Card } from 'react-bootstrap'

const Cards = ({ pokemon }) => {
  const { id, name } = pokemon;
  const [state, dispatch] = useContext(StoreContext);

  const openPokemonModal = async () => {
    dispatch({ type: 'SET_POKEMON_MODAL', payload: true });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: true });
    const data = await getPokemon(id);
    const types = await getTypesLang(data);
    dispatch({ type: 'SET_SELECTED_POKEMON', payload: types });
    dispatch({ type: 'SET_FETCH_POKEMON_LOADING', payload: false });
  };

  return (
    <Card
      onClick={openPokemonModal}
    >
      <Card.Img variant="top" src={`${state.spriteEndpoint}${id}.png`} style={{width: '100px'}} />
      <Card.Body>
        <Card.Title style={{fontSize: "11px"}} >{`${id} ${wordsToUppercase(name)}`}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Cards;