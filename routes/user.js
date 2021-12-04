const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all users
router.get('/findAllUser', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

router.get('/findAllJob', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;

    return response.send(username);

})

router.get('/whoIsAlsoLoggedIn', function(request, response) {
    const username = request.username;

    return response.send(username);

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

  // pokemons.push({
  //   name: name,
  //   health: health,
  // })

  // response.send("Success!")

})

router.post('/authenticate', function(request, response) {
    let { username, password } = request.body;
    password = JSON.stringify(password);
    console.log(password);
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {

                // const payload = {username: username};

                // const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
                //     expiresIn: '14d',
                // });

                request.session.username = username;

                //return response.cookie('huntersCookie', token, {httpOnly: true})
                return response.status(200).send({username});

                // return response.status(200).send("User is logged in!")
            } else {
                return response.status(404).send("No user found with that password");
            }
        })


        //     // user.comparePassword(password, (error, match) => {
        //         if (match) {
        //             const payload = {username};
        //             // JWT is encrypting our payload (which is whatever data we want
        //             // to carry across sessions: in this case, just the username)
        //             // into the cookie based on our SECRET
        //             const token = jwt.sign(payload, process.env.SUPER_SECRET, {
        //                 expiresIn: '14d' // optional cookie expiration date
        //             });
        //             // Here we are setting the cookie on our response obect.  
        //             // Note that we are returning the username, but that isn't as necessary anymore
        //             // unless we want to reference that on the frontend
        //             return res.cookie('token', token, {httpOnly: true})
        //                 .status(200).send({username});
        //         }
        //         return res.status(400).send("The password does not match");
        //     });
        // })
        .catch((error) => console.error(`Something went wrong: ${error}`));


    // return UserModel.findUserByUsername(username)
    //     .then((userResponse) => {
    //         if (!userResponse) {
    //             return response.status(404).send("No user found with that username");
    //         }
    //         if (userResponse.password === password) {
    //             return response.status(200).send("User is logged in!")
    //         } else {
    //             return response.status(404).send("No user found with that password");
    //         }
    //     })
    //     .catch(error => res.status(400).send(error))


})


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
        .catch(error => res.status(400).send(error))

});

module.exports = router;