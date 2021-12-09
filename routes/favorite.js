const { response } = require('express');
const express = require('express');
const router = express.Router();
const FavModel = require('./models/Favorite.Model');
const auth_middleware = require('./auth_middleware.js')


// Returns all fav for a logged in user
router.get('/', auth_middleware, function(request, response) {
    const userId = request.username;
    console.log("usd", userId);
    if (!userId) {
        return response.status(422).send("Missing userId");
    }

    return FavModel.getAllFavsForUserId(userId)
        .then((favResponse) => {

            // NO usage!!! 
            // if(!favResponse) {
            //     response.status(404).send("Job not found");
            // }

            response.send(favResponse)
        })
        .catch((error) => response.status(500).send("Issue getting fav for userId", error))
})



// // Returns all fav for a user
// router.get('/:userId', (request, response) => {
//     const userId = request.params.userId;
//     console.log("usd", userId);
//     if (!userId) {
//         return response.status(422).send("Missing userId");
//     }

//     return FavModel.getAllFavsForUserId(userId)
//         .then((favResponse) => {

//             // NO usage!!! 
//             // if(!favResponse) {
//             //     response.status(404).send("Job not found");
//             // }

//             response.send(favResponse)
//         })
//         .catch((error) => response.status(500).send("Issue getting fav for userId", error))
// })


// // Returns a fav
// router.get('/detail/:favId', (request, response) => {
//     const favId = request.params.favId;
//     console.log("usd", favId);
//     if (!favId) {
//         return response.status(422).send("favId");
//     }

//     return FavModel.findFavById(favId)
//         .then((favResponse) => {
//             //   if(!favResponse) {
//             //       //just no fav jov associate with it 
//             //       response.status(404).send("no such fav job");
//             //   } else{
//             //       response.status(200).send(favResponse)
//             //   }
//             //   //this may need again!
//             response.send(favResponse)
//         })
//         .catch((error) => response.status(500).send("Issue getting fav for favId", error))
// })


router.get('/detail/:jobId', auth_middleware, function(req, res){
    console.log("fav detail", req.params.jobId);
    const userId = req.username;
    const jobId = req.params.jobId;
    const id = getFavId(userId, jobId)
    console.log("fav detailid ",id);


    if (!id ) {
        return res.status(422).send("id not exist");
    }

    return FavModel.findFavById(id )
        .then((favResponse) => {
            //   if(!favResponse) {
            //       //just no fav jov associate with it 
            //       response.status(404).send("no such fav job");
            //   } else{
            //       response.status(200).send(favResponse)
            //   }
            //   //this may need again!
            res.send(favResponse)
        })
        .catch((error) => res.status(500).send("Issue getting fav for favId", error))
})



router.post('/',  auth_middleware, function (req, res) {
    console.log("passed", req.body);


    // const { id, userId, jobId, favOrNot, status, jobTitle,
    //     companyName,
    //     location
    // } 
    const form = req.body;
    form.userId = req.username;
    form.id = req.username+ "_" +form.jobId;
    if (!form.id) {
        return res.status(422).send("Missing favId: " + id)
    }

    return FavModel.insertFav(form)
        .then((favResponse) => {
            return res.status(200).send(favResponse);

        })
        .catch(error => res.status(400).send(error))
});

//only allow to change status 
router.put('/:jobId', auth_middleware,  function (req, res) {
    const userId = req.username;
    const jobId = req.params.jobId;
    const id = getFavId(userId, jobId)
    console.log("passed", req.body);

    const status  = req.body.status;
    if (!id) {
        return res.status(422).send("Missing favId: " + id)
    }

    return FavModel.updateStatusById(id, status)
        .then((favResponse) => {
            return res.status(200).send(favResponse);

        })
        .catch(error => res.status(400).send(error))
});


router.delete('/:jobId', auth_middleware,  function (req, response) {
    const userId = req.username;
    const jobId = req.params.jobId;
    const id = getFavId(userId, jobId)
    if (!id) {
        return response.status(422).send("Missing data");
    }

    return FavModel.deleteFavById(id)
        .then((favResponse) => {
            if (!favResponse) {
                response.status(404).send("Job not found");
            }

            response.send(favResponse)
        })
        .catch((error) => response.status(500).send("Issue getting fav"))
})



// router.post('/:userId', function (req, res) {
//     console.log("passed", req.body);
//     //TODO status!
//     const { id, userId, jobId, favOrNot, status, jobTitle,
//         companyName,
//         location
//     } = req.body;
//     if (!id) {
//         return res.status(422).send("Missing favId: " + id)
//     }

//     return FavModel.insertFav({
//         id, userId, jobId, favOrNot, status, jobTitle,
//         companyName,
//         location
//     })
//         .then((favResponse) => {
//             return res.status(200).send(favResponse);

//         })
//         .catch(error => res.status(400).send(error))
// });


// router.put('/:favId', function (req, res) {
//     //actually is the key
//     const id = req.params.favId;

//     console.log("passed", req.body);

//     const { status } = req.body;
//     if (!id) {
//         return res.status(422).send("Missing favId: " + id)
//     }

//     return FavModel.updateStatusById(id, status)
//         .then((favResponse) => {
//             return res.status(200).send(favResponse);

//         })
//         .catch(error => res.status(400).send(error))
// });




// router.delete('/:favId', (request, response) => {
//     const favId = request.params.favId;
//     if (!favId) {
//         return response.status(422).send("Missing data");
//     }

//     return FavModel.deleteFavById(favId)
//         .then((favResponse) => {
//             if (!favResponse) {
//                 response.status(404).send("Job not found");
//             }

//             response.send(favResponse)
//         })
//         .catch((error) => response.status(500).send("Issue getting fav"))
// })


module.exports = router;

function getFavId(userId, jobId){
    return userId + "_" + jobId;
}