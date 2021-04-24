import React, { useState, useEffect } from 'react';
import Store from './context';
import GlobalStyles from './components/styles/GlobalStyles'
import FilterResults from 'react-filter-search';
import { getAllPokemons } from './api/pokeapi';
import Cards from './components/Card';
import { Row, Col, Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import PokeModal from './components/PokeModal'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllPokemons();
        setPokemons(data);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: "100vh"}}>
        <p style={{fontSize: "50px", fontFamily: "Press Start 2P"}}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Lamentamos los problemas técnicos 😞</p>;
  }

  return (
    <Store>
      <GlobalStyles/>
      <Navbar sticky="top">
        <Navbar.Brand href="#home">Pokedex</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="¡Busca tu Pokemon!" className="mr-sm-2" onChange={e => setSearch(e.target.value)}/>
        </Form>
      </Navbar>
      <Container>
        <Row xs={2} md={5} lg={6} >
          <PokeModal/>
          <FilterResults
            value={search}
            data={pokemons}
            renderResults={results => (
              <>
                {results.map(i => (
                  <Col  key={i.id} style={{ minWidth: "200px", margin: "10px 0px" }}>
                    <Cards pokemon={i} />
                  </Col>
                ))}
              </>
            )}
          />
        </Row>
      </Container>
    </Store>
  );
}

export default App;
