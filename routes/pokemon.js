const express = require('express');
const router = express.Router();
const PokemonAccessor = require('./models/Pokemon.Model');


// const pokemons = [
//   {   
//       name:'charizard',
//       health: 10,
//   },
//   {
//       name: 'pikachu',
//       health: 50,
//   }
// ]


// https://www.amazon.com/dp/B074LRF639/


// Returns all known pokemon
router.get('/findAll', function(request, response) {
  return PokemonAccessor.getAllPokemon()
    .then(pokemonResponse => response.status(200).send(pokemonResponse))
    .catch(error => response.status(400).send(error))
})

// router.get('/find/:pokemonName', function(req, res) {
  
//   // const pokemonQuery = req.query.q;
//   const pokemonQuery = req.params.pokemonName;
//   // const foundPokemon = pokemons.find((pokemon) => pokemon.name === pokemonQuery)
//   let foundPokemon = null;
  
//   for (let pokemon of pokemons) {
//     if (pokemon.name === pokemonQuery) {
//       console.log(pokemon)
//       foundPokemon = pokemon
//     }
//   } 
//   if (!foundPokemon) {
//     return res.status(404).send("No pokemon found!");
//   }

//   res.send(foundPokemon);
  
// });

router.post('/create', (request, response) => {
  const {name, health} = request.body;
  if(!name || !health) {
    return response.status(422).send("Missing data");
  }
  
  return PokemonAccessor.findPokemonByName(name)
    .then((pokemonResponse) => {
      if(pokemonResponse.length) {
        response.status(402).send("Pokemon with that name already exists")
      } else {
        PokemonAccessor.insertPokemon(request.body)
          .then(pokemonResponse => response.status(200).send(pokemonResponse))
          .catch(error => response.status(400).send(error))
        
      }

    }
      
    
    )

  // pokemons.push({
  //   name: name,
  //   health: health,
  // })

  // response.send("Success!")

})

router.get('/about', function(req, res) {
  res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!