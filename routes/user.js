const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')
const bcrypt = require("bcryptjs");

// Returns all known user
// http://localhost:8000/api/users/findAll
router.get('/findAll', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)  
        })  
        .catch(error => response.status(400).send(error))
})

// http://localhost:8000/api/users/whoIsLoggedIn
router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;
    return response.send(username);
}) 

router.get('/whoIsAlsoLoggedIn', function(request, response) {
    const username = request.username;

    return response.send(username);

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
      })
      .catch((error) => response.status(500).send("Issue getting user"))
  })

  router.get('/findUserByUsername/:username', function (req, res) {
    return UserModel.findUserByUsername(req.params.username)
        .then((userResponse) => {
            response.status(200).send(userResponse)  
        })
        .catch(error => response.status(400).send(error))
})

router.get('/getAllCreatedJobsByUser/:username', function (req, res) {
    return UserModel.getAllCreatedJobsByUser(req.params.username)
        .then((userResponse) => {
            response.status(200).send(userResponse)  
        })
        .catch(error => response.status(400).send(error))
})


 

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

        response.send(userResponse)
    })
    .catch((error) => response.status(500).send("Issue getting user"))
})



router.post('/authenticate', function(request, response) {
    let { username, password } = request.body;
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            console.log("us", userResponse);
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {
                request.session.username = username;
                return response.status(200).send({username});
            } else {
                return response.status(404).send("No user found with that password");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));

})



  // http://localhost:8000/api/users/insertUser
  // Headers
  // Content-Type application/json

router.post('/insertUser', function(req, res) {
    console.log("req", req.body);
    let { username, password } = req.body;
    // const username = req.body.username
    // const password = req.body.password
    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }
    password = bcrypt.hashSync(req.body.password, 10)
    UserModel.findUserByUsername(username)
        .then(userResponse => {
            if (userResponse) {
                res.status(402).send("Username is used!~")
            } else {
                return UserModel.insertUser({username, password})
                    .then((userResponse) => {
                        return res.status(200).send(userResponse);
                    })
                    .catch(error => res.status(400).send(error))
            }
        }) 
});



router.post('/', (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include username AND password"});
    }
    // HERE: we are  replacing the password.  We can make the salt (the 10) 
    // more complex, but this is fine in our case
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    return UserModel.addUser(req.body)
        .then((success) => res.send(200).send(success),
            error => res.send(500).send(error));
});

router.post('/insertCreatedJobByUser/:username/:jobId', function (req, res) {
    return UserModel.insertCreatedJobByUser(req.params.username, req.params.jobId)
        .then((userResponse) => {
            return res.status(200).send(userResponse);
        })
        .catch(error => res.status(400).send(error))
})



router.post('/logout', function (req, res) {
    req.session.destroy();
    return res.status(200).send(req.session);
})
module.exports = router;