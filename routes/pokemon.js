const express = require('express');
const router = express.Router();


const pokemons = [
  {   
      name:'charizard',
      health: 10,
  },
  {
      name: 'pikachu',
      health: 50,
  }
]


// https://www.amazon.com/dp/B074LRF639/


router.get('/find/:pokemonName', function(req, res) {
  
  // const pokemonQuery = req.query.q;
  const pokemonQuery = req.params.pokemonName;
  // const foundPokemon = pokemons.find((pokemon) => pokemon.name === pokemonQuery)
  let foundPokemon = null;
  
  for (let pokemon of pokemons) {
    if (pokemon.name === pokemonQuery) {
      console.log(pokemon)
      foundPokemon = pokemon
    }
  } 
  res.send(foundPokemon);
});

router.post('/create', (request, response) => {
  const body = request.body;
  const {name, health} = body;

  pokemons.push({
    name: name,
    health: health,

  })

  response.send("Success!")

})

router.get('/about', function(req, res) {
  res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!