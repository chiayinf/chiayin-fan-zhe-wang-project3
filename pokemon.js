var express = require('express');
var router = express.Router();


const pokemons = [
  {   name:'charizard',
      health: 10,
  },
  {   name: 'pikachu',
      health: 50,
  }
]

// Returning a food
router.get('/find/:pokemonName', function(req, res) {
  //const pokemonQuery = req.query.name;
  //console.log(pokemonQuery)
  //localhost:8000/api/pokemon/find?name=pikachu
  const pokemonQuery = req.params.pokemonName;
  let foundPokemon = null;
  // 'in' in js return a pointer
  for (let pokemon of pokemons){
    if (pokemon.name === pokemonQuery){
      console.log(pokemon)
      foundPokemon = pokemon
    }
  }
  //res.send('The one you looked for was called ' + pokemonQuery);
  res.send(foundPokemon);
});

router.post('/create',(req, res)=>{
  const body = req.body;
  const {name, health} = body;

  pokemons.push({
    name: name,
    health: health,
  })
  res.send('good job')

})

// What's the deal with this route?
router.get('/about', function(req, res) {
  res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!