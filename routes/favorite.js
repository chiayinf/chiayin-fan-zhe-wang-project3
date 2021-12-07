const { response } = require('express');
const express = require('express');
const router = express.Router();
const FavModel = require('./models/Favorite.Model');

// Returns all fav for a user
router.get('/:userId', (request, response) => {
  const userId = request.params.userId;
  if(!userId) {
    return response.status(422).send("Missing userId");
  }
  
  return FavModel.getAllFavsForUserId(userId)
    .then((favResponse) => {
        if(!favResponse) {
            response.status(404).send("Job not found");
        }

        response.send(favResponse)
    })
    .catch((error) => response.status(500).send("Issue getting fav for userId"))
})


router.post('/:userId', function(req, res) {
    console.log("passed", req.body);
    //TODO status!
    const { id, userId, jobId, favOrNot, status} = req.body;
    if (!id) {
        return res.status(422).send("Missing favId: " +id)
    }

    return FavModel.insertFav({id, userId, jobId, favOrNot, status})
        .then((favResponse) => {
                return res.status(200).send(favResponse);

        })
        .catch(error => res.status(400).send(error))
});


router.put('/:userId', function(req, res) {
    //actually is the key
    const id = request.params.userId;

    console.log("passed", req.body);

    const { status} = req.body;
    if (!id) {
        return res.status(422).send("Missing favId: " +id)
    }

    return FavModel.updateStatusById( id,  status)
        .then((favResponse) => {
                return res.status(200).send(favResponse);

        })
        .catch(error => res.status(400).send(error))
});




router.delete('/:favId', (request, response) => {
    const favId = request.params.favId;
    if(!favId) {
      return response.status(422).send("Missing data");
    }
    
    return FavModel.deleteJobById(favId)
      .then((favResponse) => {
          if(!favResponse) {
              response.status(404).send("Job not found");
          }
  
          response.send(favResponse)
      })
      .catch((error) => response.status(500).send("Issue getting fav"))
  })
  

module.exports = router;