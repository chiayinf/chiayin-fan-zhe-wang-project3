const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');


// Returns all known user
// http://localhost:8000/api/users/findAll
router.get('/findAll', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
            
        })  
        .catch(error => response.status(400).send(error))
})

//http://localhost:8000/api/users/hunter1
router.get('/:username', (request, response) => {
    const username = request.params.username;
    if(!username) {
      return response.status(422).send("Missing data");
    }
    
    return UserModel.findUserByUsername(username)
      .then((userResponse) => {
          if(!userResponse) {
              response.status(404).send("User not found");
          }
  
          response.send(userResponse);
          //response.status(200).send("findUserByUsername is done");
      })
      .catch((error) => response.status(500).send("Issue getting user"))
  })

  // http://localhost:8000/api/users
  // Headers
  // Content-Type application/json
  router.post('/', function(req, res) {
    const { username, password } = req.body;
    // const username = req.body.username
    // const password = req.body.password
    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    return UserModel.insertUser({username, password})
        .then((userResponse) => {
                return res.status(200).send(userResponse);
        })
        .catch(error => res.status(400).send('user'))

});

  
router.get('/find/:pokemonName', function (req, res) {

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
    const { name, health } = body;

    pokemons.push({
        name: name,
        health: health,

    })

    response.send("Success!")

})

router.get('/about', function (req, res) {
    res.send('Food is the best');
});

module.exports = router; // <== Look at our new friend, module.exports!