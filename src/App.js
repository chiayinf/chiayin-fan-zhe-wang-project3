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

    axios.get('http://localhost:8000/api/pokemon/find/pikachu')
      .then(response => setPokemon(response.data))
      .catch(error => console.warn("error"));
    console.log("hello, there");
  }

  return (
    <div>
      <div class = "main">
      <h1>
      Hey! Name the Job you want!
      </h1>
      <input type='text' placeholder="type keyword in job title" value={formInput}
      onChange={(e) => setFormInput(e.target.value)} />
      <button onClick={onSearchButtonClick=> navigate('/search/?term='+formInput)}>
        Search for Jobs
      </button>
 </div>

      <br/>
      <button onClick={onSearchButtonClick=> navigate('/create')}>
        Create Jobs
      </button>
      <button onClick={onSearchButtonClick=> navigate('/favorite')}>
        my favorites
      </button>
      <button onClick={onSearchButtonClick=> navigate('/job')}>
        job
      </button>
      <button onClick={onSearchButtonClick=> navigate('/login')}>
        LogIn
      </button>

    </div>
 
  );
}

export default App;
