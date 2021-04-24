import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --grey: #383f49;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Press Start 2P', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    color: var(---black);
  }

  .card {
    border-radius: 1.25rem;
    width: 100%; 
    align-items: center; 
    min-width: 200px;
    box-shadow: 3px 3px 7px #3B4CCA;
    cursor: pointer;
    transition: 0.8s;
  }

  .card:hover{
    box-shadow: 3px 3px 7px #FFDE00;
  }

  .container {
    padding: 50px;
    max-width: 100vw;
    min-height: 100vh;
    background-color: #b4bdff;
  }

  .navbar {
    background-color: #CC0000 !important;
    padding: 10px 45px !important;
  }

  .navbar-brand {
    color: white !important;
    font-size: 25px !important;
    padding-left: 10px !important;
  }
  .dream-image {
    max-height:  250px;
    padding: 30px 15px 30px 30px;
  }
  .poke-description {
    font-size: 12px;
    padding: 10px 30px 20px 0px;
  }
  .modal-body {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;


export default GlobalStyles;