import React, { useContext } from 'react';
import { StoreContext } from '../context';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { wordsToUppercase, changeNumber } from '../utilities'

const PokeModal = (props) => {
  const [state, dispatch] = useContext(StoreContext);

  const typeColors = {
    Normal: '#8A8A80',
    Fuego: '#FE6148',
    Agua: '#4B90D6',
    Eléctrico: '#FFCC32',
    Planta: '#77CC55',
    Hielo: '#7ED4FF',
    Lucha: '#BA5544',
    Veneno: '#AA5599',
    Tierra: '#D8BD6C',
    Volador: '#9AA9FE',
    Psíquico: '#FF6FA9',
    Bicho: '#AABB22',
    Roca: '#C5B67E',
    Fantasma: '#7D7EC6',
    Dragón: '#7766ED',
    Acero: '#B7B7C5',
    Hada: '#F1A9F0',
  };

  const stats = state.selectedPokemon.stats.map((i, index) => {
    return i.base_stat
  })
  
  const typesTags = state.selectedPokemon.types.map((i, index) => {
    return (
      <React.Fragment key={index}>
        <div
          style={{
            background: typeColors[state.selectedPokemon.tipos[index]],
            color: 'white',
            padding: 5,
            display: 'inline-block',
          }}
        >
          {state.selectedPokemon.tipos[index]}
        </div>{' '}
      </React.Fragment>
    );
  });

  const handleClose = () => {
    dispatch({ type: 'SET_POKEMON_MODAL', payload: false });
  };

  return (
    <Modal
      {...props}
      show={state.pokemonModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {state.fetchPokemonLoading ? <Spinner animation="border" variant="warning" /> : wordsToUppercase(state.selectedPokemon.name)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.fetchPokemonLoading ? <></> :
        <img src={state.selectedPokemon.dream_image} alt={state.selectedPokemon.name} className="dream-image"/> }
        <div style={{display: "flex", flexDirection: "column", paddingLeft: 15}}>
          <div style={{display: "flex"}}>
            {state.fetchPokemonLoading ? <></> : <p style={{paddingRight: 20}}>Altura:{changeNumber(state.selectedPokemon.height * 0.1)}m</p> }
            {state.fetchPokemonLoading ? <></> : <p>Peso:{changeNumber(state.selectedPokemon.weight * 0.1)}kg</p> }
          </div>
          <p className="poke-description">
          {state.fetchPokemonLoading ? <></> : state.selectedPokemon.flavor_text }
          </p>
          <div>{state.fetchPokemonLoading ? <></> : typesTags }</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <DropdownButton id="dropdown-basic-button" title="Habilidades" variant="danger">
          {state.selectedPokemon.abilities.map((i, index) => (
              <Dropdown.Item key={index} variant='warning'>{state.fetchPokemonLoading ? '¿?' : i.ability.name}</Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Estadísticas" variant="success">
          <Dropdown.Item variant='warning'>HP: {state.fetchPokemonLoading ? '0' : stats[0]}</Dropdown.Item>
          <Dropdown.Item variant='warning'>Ataque: {state.fetchPokemonLoading ? '0' : stats[1]}</Dropdown.Item>
          <Dropdown.Item variant='warning'>Defensa: {state.fetchPokemonLoading ? '0' : stats[2]}</Dropdown.Item>
          <Dropdown.Item variant='warning'>Ataque Especial: {state.fetchPokemonLoading ? '0' : stats[3]}</Dropdown.Item>
          <Dropdown.Item variant='warning'>Defensa Especial: {state.fetchPokemonLoading ? '0' : stats[4]}</Dropdown.Item>
          <Dropdown.Item variant='warning'>Velocidad: {state.fetchPokemonLoading ? '0' : stats[5]}</Dropdown.Item>
        </DropdownButton>
        <Button onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PokeModal
