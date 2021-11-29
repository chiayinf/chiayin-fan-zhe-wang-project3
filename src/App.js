import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [formInput, setFormInput] = useState('');
  const [pokemon, setPokemon] = useState({
    name: 'No pokemon selected', health: -1,
  })
  const navigate = useNavigate();
  function onSearchButtonClick() {
    // const pokemon = axios.get('...')
    // console.log(pokemon);

    axios.get('http://localhost:8000/api/pokemon/find/pikachu')
      .then(response => setPokemon(response.data))
      .catch(error => console.warn("error"));
    console.log("hello, there");
  }

  return (
    <div>
      
      <h1>
      name it whatever you please job board
      </h1>
      <input type='text' value={formInput}
      onChange={(e) => setFormInput(e.target.value)} />
      <button onClick={onSearchButtonClick=> navigate('/search')}>
        Search for Jobs
      </button>
      <button onClick={onSearchButtonClick=> navigate('/create')}>
        Create Jobs
      </button>
      <button onClick={onSearchButtonClick=> navigate('/favorite')}>
        my favorites
      </button>
      <button onClick={onSearchButtonClick=> navigate('/job')}>
        job
      </button>
      <div>
        Pokemon Name: {pokemon.name}
      </div>
      <div>
        Pokemon Health: {pokemon.health}
      </div>

    </div>
 
  );
}

export default App;
